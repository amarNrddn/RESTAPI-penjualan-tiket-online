const mongoose = require("mongoose")

const ticketCategoriesSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: [true, 'tipe tiket harus di isi'],
        },
        price: {
            type: Number,
            default: 0
        },
        stock: {
            type: Number,
            default: 0
        },
        statusTicketCategories: {
            type: Boolean,
            enum: [true, false],
            default: true
        },
        experied: {
            type: Date
        }
    }
)

const EventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Judul harus di isi"],
            minlength: 3,
            maxlength: 50,
        },
        date: {
            type: Date,
            required: [true, "Tanggal harus di isi"],
        },
        about: {
            type: String
        },
        tagline: {
            type: String,
            required: [true, "tagline harus di isi"]
        },
        keyPoint: {
            type: [String]
        },
        venueName: {
            type: String,
            required: [true, "Tempat acara harus di isi"]
        },
        statusEvent: {
            type: String,
            enum: ['Draft', 'Published'],
            default: "Draft"
        },
        tickets: {
            type: [ticketCategoriesSchema],
            required: true
        },
        image: {
            type: mongoose.Types.ObjectId,
            ref: "image",
            required: true
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            required: true
        },
        talent: {
            type: mongoose.Types.ObjectId,
            ref: "Talent",
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

module.exports = mongoose.model('Event', EventSchema)