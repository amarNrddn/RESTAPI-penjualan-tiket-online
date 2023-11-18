const UserRefreshToken = require('../../api/v1/userRefreshToken/model')
const Users = require('../../api/v1/users/model')
const {
    isTokenValidRefreshToken,
    createJWT,
    createTokenUser
} = require('../../utils')
const { NotFoundError, BadRequestError } = require('../../errors')

const createUserRefreshToken = async (payload) => {
    const result = await UserRefreshToken.create(payload)

    return result
}

const getUsersRefreshToken = async (req) => {
    const { refreshToken, email } = req.params

    const result = await UserRefreshToken.findOne({
        refreshToken
    })

    if(!result) throw new BadRequestError("Token tidak ada")

    const payload = isTokenValidRefreshToken({ token: result.refreshToken })

    if (email !== payload.email) throw new NotFoundError('refreshToken tidak valid')

    const userCheck = await Users.finOne({email: payload.email})

    const token = createJWT({payload: createTokenUser(userCheck)})

    return token
}


module.exports = {
    createUserRefreshToken,
    getUsersRefreshToken
}