import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, "Please add a name"],
        minlength: [4, "Please make the name at least 4 characters."]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story"
    },
}, {
    timestamps : true
});


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(11);
        this.password = await bcrypt.hash(this.password, hash);
        next();
    } catch (error) {
        console.error("User Password Hashing Error: ", error.message);
        next(error);
    }
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;