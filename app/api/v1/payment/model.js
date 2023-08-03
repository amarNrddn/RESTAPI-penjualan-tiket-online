const monggose = require("mongoose")

const paymentSchema = new monggose.Schema(
    {
        type: {
            type: String,
            required: [true, "Tipe pembayaran wajib di isi"],
            minLength: 3,
            maxLength: 50
        },
        image: {
            type: monggose.Types.ObjectId,
            ref: "image",
            required: true
        },
        status: {
            type: Boolean,
            enum: [true, false],
            default: true
        },
        organizer: {
            type: monggose.Types.ObjectId,
            ref: "Organizer",
            required: true
        }
    },
    {timestamp: true}
)

module.exports = monggose.model("Payment", paymentSchema)