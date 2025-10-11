import dotenv from "dotenv";
import Journal from "../models/journalModel.js";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || "tester123";

export const createPage = async (req, res) => {
    try {
        const {customId, title, author, authorPassword, contents} = req.body;

        const journal = await Journal.create({
            customId,
            title,
            author,
            authorPassword,
            contents
        });

        if (!title || !author || !authorPassword || !contents) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        res.status(201).json({ success: true, data: journal});

    } catch (error) {
        console.error("Server Error Create product: ", error.message);
        res.status(500).json({ success: false, message: "Server Error Create Journal: ", error });
    }
};

export const getOneJournal = async(req, res) => {
    const { id } = req.params;
    const { key } = req.query; // Secret key for decryption
    
    try {
        const journal = await Journal.findOne({ customId: id });
        if (!journal) {
            return res.status(404).json({ message: "Journal not found" });
        }

        if (key === SECRET_KEY) {
            journal.contents = journal.decryptContents();
        } else {
            journal.contents = "Contents are encrypted, provide a valid key to view them.";
        }

        res.status(200).json({ success: true, data: journal});

    } catch (error) {
        console.error("Error retrieving single journal:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllJourals = async (req, res) => {
    const { key, author, authorPassword} = req.body;

    try {

        if(!author || !authorPassword){
            return res.status(400)
                .json({success:false, message: "Author and authorPassword are required."});
        }

        const journals = await Journal.find({author});

        if (journals.length === 0){
            return res.status(404).json({success:false, data: "No journals found for this author."});
        }

        if(journals[0].authorPassword !== authorPassword){
            return res.status(403).json({success:false, message:"Invalid author password."});
        }

        const formatted = journals.map((journal) => {
            const decrypted = key === SECRET_KEY ? journal.decryptContents() : null;
            return {...journal.toObject(), contents: decrypted || "Contents are encrypted, provide a valid key to view them.",}
        })

        res.status(200).json({ success: true, data: formatted });

    } catch (error) {
        console.error("Error fetching author's journals:", error);
        res.status(500).json({ success: false, message: "Error fetching author's journals", error });
    }
}