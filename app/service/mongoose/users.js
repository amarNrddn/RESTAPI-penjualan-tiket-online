const Users = require("../../api/v1/users/model")
const Organizers = require("../../api/v1/organizers/model")
const { BadRequestError } = require("../../errors")

const createOrganizer = async (req) => {
    const { name, organizer, email, role, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
        throw new BadRequestError("Password dan confirm password tidak sama!")
    }

    const result = await Organizers.create({ organizer })

    const users = await Users.create({
        name,
        email,
        password,
        role,
        organizer: result._id
    })

    delete users._doc.password

    return users
}

const createUsers = async (req, res) => {
    const { name, email, role, password, confirmPassword } = req.body

    if (password !== confirmPassword) {
        throw new BadRequestError("Password dan confirm password tidak sama!")
    }

    const result = await Users.create({
        name,
        email,
        password,
        organizer: req.user.organizer,
        role
    })

    return result
}

const getAllUsers = async(req) => {
    const {limit = 10, page = 1} = req.query
    let condition = {}
    
    const result = await Users.find(condition)
        .limit(limit)
        .skip(limit * (page - 1))
    
    const count = await Users.countDocuments(condition)

    return {data: result, pages: Math.ceil(count / limit), total: count }
}

module.exports = { createOrganizer, createUsers, getAllUsers }