const { createOrganizer, createUsers, getAllUsers } = require("../../../service/mongoose/users")
const { StatusCodes } = require("http-status-codes")
const { get } = require("mongoose")

const createCMSOrganizer = async (req, res, next) => {
    try {
        const result = await createOrganizer(req)

        res.status(StatusCodes.OK).json({ data: result })
    } catch (error) {
        next(error)
    }
}

const createCMSUser = async (req, res, next) => {
    try {
        const result = await createUsers(req)

        res.status(StatusCodes.OK).json({ data: result })
    } catch (error) {
        next(error)
    }
}

const getCMSUsers = async(req, res, next) => {
    try {
        const result = await getAllUsers()

        res.status(StatusCodes.OK).json({data: result})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createCMSOrganizer,
    createCMSUser,
    getCMSUsers
}