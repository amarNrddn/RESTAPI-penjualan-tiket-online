const Talent = require("../../api/v1/talents/model")
const { chekingImage } = require("./images")

const { NotFoundError, BadRequestError } = require("../../errors")

const getAllTalens = async (req) => {
    const { keyword } = req.query

    let condition = { organizer: req.user.organizer }

    if (keyword) {
        condition = { ...condition, name: { $regex: keyword, $options: "i" } }
    }

    const result = await Talent.find(condition)
        .populate({
            path: "image",
            select: "_id name",
        })
        .select("_id name role image")

    return result
}

const createTalent = async (req) => {
    const { name, role, image } = req.body

    // untuk mencari image dengan filed image
    await chekingImage(image)

    // untuk mecari talent dengan filed talent
    const check = await Talent.findOne({
        name,
        organizer: req.user.organizer
    })

    // jika data talant sudah ada maka tampilkan error BadRequestError dengan pesan dupikat
    if (check) throw new BadRequestError(`Pembicara nama duplikat`)

    const result = await Talent.create({
        name,
        role,
        image,
        organizer: req.user.organizer
    })

    return result
}

const getOneTalent = async (req) => {
    const { id } = req.params

    const result = await Talent.findOne({
        _id: id,
        organizer: req.user.organizer
    })
        .populate({
            path: "image",
            select: "_id name"
        })
        .select("_id name role image")

    if (!result) throw new NotFoundError(`Taidak ada pembicara dengan id : ${id}`)

    return result
}

const updateTelent = async (req) => {
    const { id } = req.params
    const { name, role, image } = req.body

    await chekingImage()

    const check = await Talent.findOne({
        name,
        organizer: req.user.organizer,
        _id: { $ne: id }
    })

    //jika data talant sudah ada maka tampilkan error BadRequestError dengan pesan dupikat
    if (check) throw new BadRequestError(`Pembicara nama duplikat`)

    const result = await Talent.findOneAndUpdate(
        { _id: id },
        { name, role, image, organizer: req.user.organizer },
        { new: true, runValidators: true }
    )

    if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id : ${id}`)

    return result
}

const deleteTalent = async (req) => {
    const { id } = req.params

    const result = await Talent.findOneAndDelete({
        _id: id,
        organizer: req.user.organizer
    })

    if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id : ${id}`)

    return result
}

const chekingTalent = async (id) => {
    const result = await Talent.findOne({ _id: id })

    if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id : ${id}`)

    return result
}

module.exports = {
    getAllTalens,
    createTalent,
    getOneTalent,
    updateTelent,
    deleteTalent,
    chekingTalent
}