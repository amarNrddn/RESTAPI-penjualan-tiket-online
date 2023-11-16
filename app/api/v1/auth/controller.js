const { sigin } = require("../../../service/mongoose/auth")
const { StatusCodes } = require("http-status-codes")

const siginCMS = async (req, res, next) => {
    try {
        const result = await sigin(req)

        res.status(StatusCodes.CREATED).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { siginCMS }