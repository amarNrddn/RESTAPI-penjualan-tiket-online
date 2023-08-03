const jwt = require("jsonwebtoken")
const {jwtExpiration, jwtSecret} = require("../config")

const createJWT = ({payload}) => {
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: jwtExpiration
    })

    return token
}

const isTokenValid = ({token}) => jwt.verify(token, jwtSecret)

module.exports = {
    createJWT,
    isTokenValid
}