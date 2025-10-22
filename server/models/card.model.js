import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    characters: {
        type: String,
    },
    contents: [{
        type: String,
    }],
    notes: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: "Note"
    }]
})

const Card = mongoose.model("Card", cardSchema);

export default Card;