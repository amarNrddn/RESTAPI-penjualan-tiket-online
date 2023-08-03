const nodemailer = require("nodemailer")
const {gmail, password} = require("../../config")
const Mustach = require("mustache")
const fs = require('fs')

const transpoter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, //true for 465, false for outher ports
    auth: {
        user: gmail,
        pass: password
    }
})

const otpMail = async(email, data) => {
    try {
        let template = fs.readFileSync('app/views/email/otp.html', 'utf8')

        let message = {
            from: gmail,
            to: email,
            subject: 'otp for registrasion is: ',
            html: Mustach.render(template, data)
        }

        return await transpoter.sendMail(message)
    } catch (ex) {
        console.log(ex)
    }
}

const orderMail = async(email, data) => {
    try {
        let template = fs.readFileSync('app/views/email/order.html', 'utf8')

        let message = {
            from: gmail,
            to: email,
            subject: 'Thank you for buying',
            html: Mustach.render(template, data)
        }

        return await transpoter.sendMail(message)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {otpMail, orderMail}