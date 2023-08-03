const Orders = require("../../api/v1/orders/model")
const Events = require("../../api/v1/event/model")
const { NotFoundError } = require("../../errors")

const getAllOrders = async (req) => {
    const { limit = 10, page = 1, startDate, endDate } = req.query
    let condition = {};

    if (req.user.role !== 'owner') {
        condition = { ...condition, 'historyEvent.organizer': req.user.organizer }
    }

    if (startDate && endDate) {
        const start = new Date(startDate)
        start.setHours(0, 0, 0)
        const end = new Date(endDate)
        end.setHours(23, 59, 59)
        condition = {
            ...condition,
            date: {
                $gte: start,
                $lt: end,
            }
        }
    }

    const result = await Orders.find(condition)
        .limit(limit)
        .skip(limit * (page - 1))

    const count = await Orders.countDocuments(condition)

    return { data: result, pages: Math.ceil(count / limit), total: count }
}

const changeStatusEvent = async (req) => {
    const { id } = req.params
    const { statusEvent } = req.body

    const checkEvent = await Events.findOne({ _id: id })

    if (!checkEvent) throw new NotFoundError(`Tidak ada acara dengan id : ${id} `)

    checkEvent.statusEvent = statusEvent

    await checkEvent.save()

    return checkEvent
}

module.exports = { 
    getAllOrders,
    changeStatusEvent
}