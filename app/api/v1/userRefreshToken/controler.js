const { StatusCodes } = require('http-status-codes')
const { getUsersRefreshToken } = require('../../../service/mongoose/refreshToken')

const index = async (req, res, next) => {
    try {
        const result = await getUsersRefreshToken(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { index }