const Event = require("../../api/v1/event/model")
const { chekingImage } = require("./images")
const { checkingCategories } = require("./categories")
const { chekingTalent } = require("./talent")

const { NotFoundError, BadRequestError } = require("../../errors")

const createEvent = async (req) => {
    const {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent
    } = req.body

    await chekingImage(image)
    await checkingCategories(category)
    await chekingTalent(talent)

    const check = await Event.findOne({ title })

    if (check) throw new BadRequestError("judul event duplikat")

    const result = await Event.create({
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
        organizer: req.user.organizer
    })

    return result
}

const getAllEvent = async (req) => {
    const { keyword, category, talent, status } = req.query

    let condition = { organizer: req.user.organizer }

    if (keyword) condition = { ...condition, title: { $regex: keyword, $options: "i" } }

    if (category) condition = { ...condition, category: category }

    if (talent) condition = { ...condition, talent: talent }

    if(["Draft", "Published"].includes(status)){
        condition = {
            ...condition,
            statusEvent: status
        }
    }

    const result = await Event.find(condition)
        .populate({
            path: "image",
            select: '_id name'
        })
        .populate({
            path: "category",
            select: "_id name"
        })
        .populate({
            path: "talent",
            select: "_id name"
        })

    return result
}

const getOneEvent = async (req) => {
    const { id } = req.params

    const result = await Event.findOne({
        _id: id,
        organizer: req.user.organizer
    })
        .populate({
            path: 'image',
            select: "_id name"
        })
        .populate({
            path: 'category',
            select: "_id name"
        })
        .populate({
            path: 'talent',
            select: "_id name role image",
            populate: {
                path: 'image',
                select: '_id name'
            }
        })

    if (!result) throw new BadRequestError(`tidak ada acara dengan id : ${id}`)

    return result
}

const updateEvent = async (req) => {
    const { id } = req.params
    const {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent
    } = req.body

    await chekingImage(image)
    await checkingCategories(category)
    await chekingTalent(talent)

    const check = await Event.findOne({
        title,
        organizer: req.user.organizer,
        _id: { $ne: id }
    })

    if (check) throw new BadRequestError('Judul Event dupikat')

    const result = await Event.findOneAndUpdate(
        { _id: id },
        {
            title,
            date,
            about,
            tagline,
            venueName,
            keyPoint,
            statusEvent,
            tickets,
            image,
            category,
            talent,
            organizer: req.user.organizer
        },
        { new: true, runValidators: true }
    )

    if (!result) throw new BadRequestError(`Tidak ada pembicara dengan id : ${id}`)

    return result
}

const deleteEvent = async (req) => {
    const { id } = req.params

    const result = await Event.findOneAndDelete({
        _id: id,
        organizer: req.user.organizer
    })

    if (!result) throw new BadRequestError(`Tidak ada pembicara dengan id : ${id}`)

    return result
}

const changeStatusEvent = async (req) => {
    const { id } = req.params
    const { statusEvent } = req.body

    if (!['Draft', 'Published'].includes(statusEvent)) throw new NotFoundError("Status harus Published atau Draft")

    const checkEvent = await Event.findOne({
        _id: id,
        organizer: req.user.organizer
    })

    if (!checkEvent) throw new NotFoundError(`Tidak ada acara dengan id : ${id} `)

    checkEvent.statusEvent = statusEvent

    await checkEvent.save()

    return checkEvent
}

module.exports = {
    createEvent,
    getAllEvent,
    getOneEvent,
    updateEvent,
    deleteEvent,
    changeStatusEvent
}