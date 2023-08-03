const mongoose = require("mongoose")

const orderDetailSchema = new mongoose.Schema({
    ticketCategory: {
        type: {
            type: String,
            required: [true, 'Tipe tiket harus diisi']
        },
        price: {
            type: Number,
            defult: 0
        }
    },
    sumTicket: {
        type: Number,
        required: true
    },
})

const orderSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true
        },
        personalDetail: {
            fristName: {
                type: String,
                minlength: 3,
                maxlength: 50,
                required: [true, 'Please provide frist Name']
            },
            lastName: {
                type: String,
                minlength: 3,
                maxlength: 50,
                required: [true, 'please provide last name']
            },
            email: {
                type: String,
                required: [true, 'please provide email']
            },
            role: {
                type: String,
                default: 'Designer'
            }
        },
        status: {
            type: String,
            enum: ['pending', 'paid'],
            default: 'pending'
        },
        totalPay: {
            type: Number,
            required: true
        },
        totalOrderTicket: {
            type: Number,
            required: true
        },
        orderitems: [orderDetailSchema],
        participant: {
            type: mongoose.Types.ObjectId,
            ref: 'Participant',
            required: true
        },
        payment: {
            type: mongoose.Types.ObjectId,
            ref: 'Payment',
            required: true
        },
        event: {
            type: mongoose.Types.ObjectId,
            ref: 'Event',
            required: true
        },

        historyEvent: {
            title: {
                type: String,
                minlength: 3,
                maxlength: 50,
                required: [true, 'Please proved title']
            },
            date: {
                type: Date,
                required: true
            },
            about: {
                type: String
            },
            tagline: {
                type: String,
                required: [true, 'Tag line harus diisi']
            },
            keyPoint: {
                type: [String]
            },
            venueName: {
                type: String,
                required: [true, 'Tempat acara harus diisi']
            },
            image: {
                type: mongoose.Types.ObjectId,
                ref: 'image',
                required: true
            },
            category: {
                type: mongoose.Types.ObjectId,
                ref: 'Category',
                required: true
            },
            talent: {
                type: mongoose.Types.ObjectId,
                ref: 'Talent',
                required: true
            },
            organizer: {
                type: mongoose.Types.ObjectId,
                ref: 'Organizer',
                required: true
            },
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)