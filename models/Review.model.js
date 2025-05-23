const { Schema, model } = require("mongoose");
const User = require("./User.model")
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
        Min: 0,
        Max: 5,
        required: true,
    },
    //image: {
       //type: String,
       // required: true,
  //  },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

})

const Review = model("Review", reviewSchema)

module.exports = Review;