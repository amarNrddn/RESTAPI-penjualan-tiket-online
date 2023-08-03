const mongoose = require("mongoose")
const { model, Schema } = mongoose

const talentSchema = Schema(
    {
        name: {
            type: String,
            required: [true, "Harus di isi!"]
        },
        role: {
            type: String,
            default: "_"
        },
        // untuk membuat relasi pada mongoose
        image: {
            type: mongoose.Types.ObjectId,
            ref: "image",
            required: true
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: "Organizer",
            required: true
        },
    },
    { timestamps: true }
)

module.exports = model("Talent", talentSchema)