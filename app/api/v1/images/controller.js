const {StatusCodes} = require('http-status-codes')
const { createImages } = require('../../../service/mongoose/images')

const create = async (req, res, next) => {
    try {
        const result = await createImages(req)

        res.status(StatusCodes.CREATED).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { create }