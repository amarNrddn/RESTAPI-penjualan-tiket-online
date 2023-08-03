const {
    getAllCategoryService,
    createCategory,
    getOneCategory,
    updateCategory,
    deleteCategory
} = require('../../../service/mongoose/categories')

const create = async (req, res, next) => {
    try {
        const result = await createCategory(req)

        res.status(201).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getAllCategory = async (req, res, next) => {
    try {
        const result = await getAllCategoryService(req)

        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getOneCategory(req)
        if (!result) {
            return res.status(404).json({ message: 'id categories tidak di temukan' })
        }

        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateCategory(req)

        res.status(200).json({
            data: result
        })

    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await deleteCategory(req);

        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create,
    getAllCategory,
    find,
    update,
    destroy
}