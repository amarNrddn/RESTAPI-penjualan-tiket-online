const { StatusCodes } = require('http-status-codes')

const errorHendelerMiddlewares = (err, req, res, next) => {
    const customError = {
        statusCodes: err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'something went worng try again leter'
    }

    if (err.name === 'validationError') {
        customError.message = Object.values(err.errors)
            .map((item) => item.massage)
            .join(', ')
        customError.statusCodes = 400
    }

    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys (
            err.keyValue)} field, please choose another value`
    }

    if(err.name === 'castError') {
        customError.msg = `No item found with id : ${err.value} `
        customError.statusCodes = 404
    }

    return res.status(customError.statusCodes).json({msg: customError.msg})
}

module.exports = errorHendelerMiddlewares