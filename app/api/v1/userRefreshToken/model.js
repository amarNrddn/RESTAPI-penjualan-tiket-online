const mongoose = require("mongoose");
const {model, Schema} = mongoose

const userRefreshTokenSchema = Schema(
    {
        regreshToken: {
            type: String,
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'Users',
            required: true
        },
    },
    { timestamps: true }
)

module.exports = model('UserRefreshToken', userRefreshTokenSchema)
