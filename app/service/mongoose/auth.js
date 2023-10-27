const User = require("../../api/v1/users/model")
const { BadRequestError, Unauthorized } = require("../../errors")
const { createTokenUser, createJWT } = require("../../utils")

const sigin = async (req) => {
    const { email, password } = req.body

    if(!email || !password) {
        throw new BadRequestError("Please provide email and password")
    }

    const result = await User.findOne({email: email})

    if(!result) throw new Unauthorized("Invalid Credential")

    const isPasswordCorrect = await result.comparePassword(password)
    
    if(!isPasswordCorrect) throw new Unauthorized("Invalid Credential")

    const token = createJWT({payload: createTokenUser(result)})

    return {token, role: result.role}
}

module.exports = {sigin}