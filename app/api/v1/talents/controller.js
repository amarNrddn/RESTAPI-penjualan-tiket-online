const {
    createTalent,
    getAllTalens,
    getOneTalent,
    updateTelent,
    deleteTalent
} = require("../../../service/mongoose/talent")
const { StatusCodes } = require("http-status-codes")

const create = async (req, res, next) => {
    try {
        const result = await createTalent(req)

        res.status(StatusCodes.CREATED).json({ data: result })
    } catch (error) {
        next(error)
    }
}

const index = async (req, res, next) => {
    try {
        const result = await getAllTalens(req)

        res.status(StatusCodes.OK).json({ data: result })

    } catch (error) {
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getOneTalent(req)

        res.status(StatusCodes.OK).json({data: result})
    } catch (error) {
        next(error)
    }
}

const update = async(req, res, next) => {
    try {
        const result = await updateTelent(req)

        res.status(StatusCodes.OK).json({data: result})
    } catch (error) {
        next(error)
    }
}

const destroy = async(req, res, next) => {
    try {
        const result = await deleteTalent(req)

        res.status(StatusCodes.OK).json({data: result})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    index,
    update,
    find,
    destroy
}