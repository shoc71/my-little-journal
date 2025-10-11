import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const SECRET_KEY = process.env.SECRET_KEY || "huh"; // let's how good the encryption is

// Ensure the key length is 32 bytes (aes-256-cbc requires 32-byte key)
function getKey() {
    let key = Buffer.from(SECRET_KEY, 'utf-8');
    if (key.length < 32) {
        // If key is shorter than 32 bytes, pad it with zeros
        const padding = Buffer.alloc(32 - key.length);
        key = Buffer.concat([key, padding]);
    } else if (key.length > 32) {
        // If key is longer than 32 bytes, trim it to 32 bytes
        key = key.slice(0, 32);
    }
    return key;
}

// AES encryption function
function encrypt(text) {
    const iv = crypto.randomBytes(16); // Generate a random 16-byte IV
    const key = getKey(); // Get the properly sized key
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    // Return the IV + encrypted text (combine them as a hex string)
    return iv.toString('hex') + ':' + encrypted;
}

// AES decryption function
function decrypt(encryptedText) {
    const parts = encryptedText.split(':'); // Split the IV and encrypted content
    const iv = Buffer.from(parts[0], 'hex'); // Extract the IV from the first part
    const encryptedData = parts[1]; // The encrypted text
    const key = getKey(); // Get the properly sized key

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
}

const journalSchema = new mongoose.Schema({
    customId: {
        type: String,
        required: true,
        unique: true,
        default: () => `journal-${Math.random().toString(36).substr(2, 9)}`, // Custom ID generation
    },
    title: {
        type : String,
        required : [true, "Please Add a Title"],
        minlength : [4, "Title must be at least 4 characters"],
        unique : true,
        trim : true
    },
    author : {
        type : String,
        required : [true, "Please Add a Title"],
        minlength : [6, "Title must be at least 6 characters"],
        trim : true
    },
    authorPassword: {
        type: String,
        required: [true, "Please add a password for the author"],
        minlength: [8, "Password must be at least 8 characters"],
        trim: true,
    },
    contents: {
        type : String,
        required : [true, "Please Add a Title"],
        minlength : [20, "Title must be at least 20 characters"],
        trim : true
    },
}, {
    timestamps : true //createdAt, updatedAt
});

// Pre-save hook to hash the password and encrypt the contents
journalSchema.pre("save", async function(next) {
    console.log("Pre-save hook triggered!");

    if (this.isModified("authorPassword")) {
        try {
            const salt = await bcrypt.genSalt(10); // Generate salt
            this.authorPassword = await bcrypt.hash(this.authorPassword, salt); // Hash the password correctly
            console.log("Password hashed successfully.");
        } catch (error) {
            console.error("Error hashing password:", error);
            return next(error);
        }
    }

    if (this.isModified("contents")) {
        try {
            // Encrypt contents before saving to DB
            this.contents = encrypt(this.contents);
            console.log("Contents encrypted.");
        } catch (error) {
            console.error("Error encrypting contents:", error);
            return next(error);
        }
    }

    next(); // Proceed with saving the document
});

// Method to decrypt contents (called when retrieving data with the correct key)
journalSchema.methods.decryptContents = function() {
    return decrypt(this.contents); // Decrypt contents using the secret key
};

const Journal = mongoose.model("Journal", journalSchema);

export default Journal;