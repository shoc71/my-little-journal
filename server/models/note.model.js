import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    comment: [{
        type: String,
    }],
    writers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card"
    }],
});

const Note = mongoose.model("Note", noteSchema);

export default Note;