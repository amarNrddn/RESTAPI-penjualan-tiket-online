const {
    siginupParticipant,
    activatePartisipant,
    siginParticipant,
    getAllEvent,
    getOneEvent,
    getAllOrder,
    checkoutOrder,
    getAllPaymentByOrganizer
} = require("../../../service/mongoose/participants")
const { StatusCodes } = require("http-status-codes")

const siginup = async (req, res, next) => {
    try {
        const result = await siginupParticipant(req)

        res.status(StatusCodes.CREATED).json({ data: result })
    } catch (error) {
        next(error)
    }
}

const activeParticipant = async (req, res, next) => {
    try {
        const result = await activatePartisipant(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const sigin = async (req, res, next) => {
    try {
        const result = await siginParticipant(req)

        res.status(StatusCodes.OK).json({
            data: { token: result }
        })
    } catch (error) {
        next(error)
    }
}

const getAllLendingPage = async (req, res, next) => {
    try {
        const result = await getAllEvent(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getDetailLendingPage = async (req, res, next) => {
    try {
        const result = await getOneEvent(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getDashboard = async (req, res, next) => {
    try {
        const result = await getAllOrder(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const checkout = async (req, res, next) => {
    try {
        const result = await checkoutOrder(req)

        res.status(StatusCodes.CREATED).json({ data: result })
    } catch (error) {
        next(error)
    }
}

const getAllPayment = async (req, res, next) => {
    try {
        const result = await getAllPaymentByOrganizer(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    siginup,
    activeParticipant,
    sigin,
    getAllLendingPage,
    getDashboard,
    getDetailLendingPage,
    checkout,
    getAllPayment
}