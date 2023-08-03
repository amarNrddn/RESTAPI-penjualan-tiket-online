const dotenv = require("dotenv")
dotenv.config()

module.exports = {
    urlDb: process.env.URL_MONGOODB_DEV,
    jwtExpiration: '24h',
    jwtSecret: 'jwtSecret',
    gmail: process.env.GMAIL,
    password: process.env.PASSWORD
}