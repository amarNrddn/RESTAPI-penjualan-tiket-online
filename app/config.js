const dotenv = require("dotenv")
dotenv.config()

module.exports = {
    urlDb: process.env.URL_MONGOODB_DEV,
    jwtExpiration: '24h',
    jwtSecret: 'jwtSecret',
    jwtRefreshTokenSecret: process.env.JWT_SECRET_KEY_REFRESH_TOKEN,
    jwtRefreshTokenExpiration: process.env.JWT_EXPIRATION_REFRESH_TOKEN,
    gmail: process.env.GMAIL,
    password: process.env.PASSWORD
}