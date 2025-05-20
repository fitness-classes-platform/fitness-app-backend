const { Schema, model } = require("mongoose");
const Class = require("./Class.model")
const mongoose = require("mongoose");

const reviewSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",

    },

    ranking: {
        type: Number,
        Min: 1,
        Max: 10,
        required: true,

    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    }
})

const Review = model("Review", reviewSchema)

module.exports = Review;