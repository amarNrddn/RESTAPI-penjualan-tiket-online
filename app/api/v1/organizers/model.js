const mongoose = require('mongoose')
const { model, Schema } = mongoose

const organizersSchema = Schema(
    {
        organizer: {
            type: String,
            required: [true, 'nama penyelenggara harus diisi']
        },
    },
    { timestamps: true }
)

module.exports = model('Organizer', organizersSchema)