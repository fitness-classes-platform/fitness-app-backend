const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const reviewSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    ranking: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    image: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true
});

const Review = model("Review", reviewSchema);

module.exports = Review;
