const Category = require('../../api/v1/categories/model')
const { BadRequestError, NotFoundError } = require('../../errors')

const getAllCategoryService = async (req) => {
    const result = await Category.find({ organizer: req.user.organizer });

    return result
}

const createCategory = async (req) => {
    const { name } = req.body
    
    const check = await Category.findOne({
        name,
        organizer: req.user.organizer
    })

    if (check) throw new BadRequestError('Kategory nama duplikat')

    const result = await Category.create({
        name,
        organizer: req.user.organizer
    })

    return result
}

const getOneCategory = async (req) => {
    const { id } = req.params

    const result = await Category.findOne({
        _id: id,
        organizer: req.user.organizer
    })

    if (!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`)

    return result
}

const updateCategory = async (req) => {
    const { id } = req.params
    const { name } = req.body

    const check = await Category.findOne({
        name,
        _id: { $ne: id },
        organizer: req.user.organizer
    })

    if (check) throw new BadRequestError('Kategori nama dupikat')

    const result = await Category.findOneAndUpdate(
        { _id: id },
        { name },
        { new: true, runValidators: true }
    )

    if (!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`)

    return result
}

const deleteCategory = async (req) => {
    const { id } = req.params

    const result = await Category.findOneAndDelete({
        _id: id,
        organizer: req.user.organizer
    })

    if (!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id} `)

    await result.remove()

    return result
}

const checkingCategories = async (id) => {
    const result = await Category.findOne({ _id: id })

    if (!result) throw new NotFoundError(`Tidak ada kategori dengan id : ${id}`)

    return result
}

module.exports = {
    getAllCategoryService,
    createCategory,
    getOneCategory,
    updateCategory,
    deleteCategory,
    checkingCategories
} 