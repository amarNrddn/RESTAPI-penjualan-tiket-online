const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const participantSchema = new mongoose.Schema(
    {
        fristName: {
            type: String,
            required: [true, 'Frist name harus di isi!'],
            minLength: 3,
            maxLength: 50
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            unique: true,
            required: [true, " Email harus di isi!"]
        },
        password: {
            type: String,
            minLength: 6,
            required: [true, "Password harus diisi"]
        },
        role: {
            type: String,
            default: "_"
        },
        status: {
            type: String,
            enum: ['aktif', 'tidak aktif'],
            default: 'tidak aktif'
        },
        otp: {
            type: String,
            required: [true, "OTP yang di kirimkan harus diisi"]
        }
    },
    {timestamps: true}   
)

participantSchema.pre('save', async function (next){
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 12)
    }
    next()
})

participantSchema.methods.comparePassword = async function(canditatePaswword) {
    const isMatch = await bcrypt.compare(canditatePaswword, this.password)
    return isMatch
}

module.exports = mongoose.model('Participant',  participantSchema)