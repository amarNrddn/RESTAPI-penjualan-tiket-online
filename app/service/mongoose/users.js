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

const getAllUsers = async() => {
    const result = await Users.find()

    return result
}

module.exports = { createOrganizer, createUsers, getAllUsers }