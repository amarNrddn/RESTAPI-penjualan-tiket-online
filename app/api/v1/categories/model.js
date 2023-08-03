const mongoose = require('mongoose')
const { model, Schema } = mongoose

const categorySchema = Schema(
    {
        name: {
            type: String,
            minLength: [3, 'panjang nama kategori minimal 3 karakter'],
            maxLength: [20, 'panjang nama kategori maksimal 20 karakter'],
            required: [true, 'nama kategori harus diisi']
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: "Organizer",
            required: true
        },
    },
    { timestamps: true }
)

module.exports = model('Category', categorySchema)