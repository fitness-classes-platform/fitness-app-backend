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
                validate: {
                        validator: function (v) {
                            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Example for email validation
                        },
                        message: (props) => `${props.value} is not a valid contact!`,
                    },
        },

        reviews: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
        }]
}
)

const Class = model("Class", classSchema)

module.exports = Class;