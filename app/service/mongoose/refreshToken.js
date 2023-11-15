const UserRefreshToken = require('../../api/v1/userRefreshToken/model')
const Users = require('../../api/v1/users/model')
const {
    isTokenValidRefreshToken,
    createJWT,
    createTokenUser
} = require('../../utils')
const { NotFoundError } = require('../../errors')

const createUserRefreshToken = async (payload) => {
    const result = await UserRefreshToken.crate(payload)

    return result
}

const getUsersRefreshToken = async (req) => {
    const { refreshToken, email } = req.params

    const result = await UserRefreshToken.findOne({
        refreshToken
    })

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