const Images = require('../../api/v1/images/model')
const {NotFoundError} = require("../../errors")

//generate URL setelah submit
const generateUrlImage = async(req) => {
    const result = `uploads/${req.file.filename}`

    return result
}

const createImages = async(req) => {
    const result = await Images.create({
        name: req.file
        ? `uploads/${req.file.filename}`
        : `uploads/avatar/default.png`
    })

    return result
}

// cheking image 
const chekingImage = async(id) => {
    const result = Images.findOne({_id: id})

    if(!result) throw new NotFoundError(`Tidak ada gambar dengan id : ${id}`)
}

module.exports = {createImages, generateUrlImage, chekingImage}