const {
    createEvent,
    getAllEvent,
    getOneEvent,
    deleteEvent,
    updateEvent,
    changeStatusEvent
} = require("../../../service/mongoose/event")
const { StatusCodes } = require("http-status-codes")


const create = async (req, res, next) => {
    try {
        const result = await createEvent(req)
        console.log(result)
        res.status(StatusCodes.CREATED).json({ data: result })
    } catch (error) {
        next(error)
    }
}

const index = async (req, res, next) => {
    try {
        const result = await getAllEvent(req)

        res.status(StatusCodes.OK).json({ 
            data: {
                event: result.data,
                pages: result.pages,
                total: result.total
            }
        })
    } catch (error) {
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getOneEvent(req)
    
        res.status(StatusCodes.OK).json({ data: result })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateEvent(req)

        res.status(StatusCodes.OK).json({ data: result })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await deleteEvent(req)

        res.status(StatusCodes.OK).json({ data: result })
    } catch (error) {
        next(error)
    }
}

const changeStatus = async(req, res, next) => {
    try {
        const result = await changeStatusEvent(req)

        res.status(StatusCodes.OK).json({ data: result })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    index,
    find,
    update,
    destroy,
    changeStatus
}