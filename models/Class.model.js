const { Schema, model } = require("mongoose");
const mongoose = require("mongoose")


const classSchema = new Schema({
        name: {
                type: String,
                required: true,
        },
        location: {
                type: String,
                required: true,
        },

        image: {
                type: String,
                required: true,
        },

        schedule: {
                type: String,
                required: true,
        },
        difficulty: {
                type: String,
                enum: ["Intensive", "Medium", "Light"],
                required: true,
        },
        contacts: {
                type: String,
        },

        reviews: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
        }]
}
)

const Class = model("Class", classSchema)

module.exports = Class;