import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a title"],
        minlength: [4, "Minimum 4 letters for the title."]
    },
    logline: {
        type: String,
        required: [true, "Please enter something for the logline."]
    },
    publishedDate: {
        type: Date,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    writers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    readBoard: {
        type: Boolean,
        default: false
    },
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card"
    }]
});

const Story = mongoose.model("Story", storySchema);

export default Story;