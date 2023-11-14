const { createOrganizer, createUsers, getAllUsers } = require("../../../service/mongoose/users")
const { StatusCodes } = require("http-status-codes")

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
        const result = await getAllUsers(req)

        res.status(StatusCodes.OK).json({
            data: {
                user: result.data,
                pages: result.pages,
                total: result.total
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createCMSOrganizer,
    createCMSUser,
    getCMSUsers
}