const {
    getAllPayment,
    createPayment,
    getOnePayment,
    updatePayment,
    deletePayment,
} = require("../../../service/mongoose/payment")
const { StatusCodes } = require("http-status-codes")

const create = async (req, res, next) => {
    try {
        const result = await createPayment(req)

        res.status(StatusCodes.CREATED).json({ data: result })
    } catch (error) {
        next(error)
    }
}

const index = async (req, res, next) => {
    try {
        const result = await getAllPayment(req)

        res.status(StatusCodes.OK).json({ data: result })
    } catch (error) {
        next(error)
    }
}

const find = async(req, res, next) => {
    try {
        const result = await getOnePayment(req)

        res.status(StatusCodes.OK).json({data: result})
    } catch (error) {
        next(error)
    }
}

const update = async(req, res, next) => {
    try {
        const result = await updatePayment(req)

        res.status(StatusCodes).json({data: result})
    } catch (error) {
        next(error)
    }
}

const destroy = async(req, res, next) => {
    try {
        const result = await deletePayment(req)

        res.status(StatusCodes).json({data: result})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    index,
    find,
    update,
    destroy
}