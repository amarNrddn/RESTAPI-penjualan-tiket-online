const mongoose = require("mongoose")
const { model, Schema } = mongoose

const imagesSchema = Schema(
    {
        name: {type: String}
    },
    {timestamps: true}
)

module.exports = model("image", imagesSchema)