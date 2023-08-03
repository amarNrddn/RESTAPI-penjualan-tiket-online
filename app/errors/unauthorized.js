const {StatusCodes} = require("http-status-codes")
const CustomAPIError = require("./custom-api-error")

class Unauthorized extends CustomAPIError {
    constructor(message){
        super(message)
        this.StatusCodes = StatusCodes.FORBIDDEN
    }
}

module.exports = Unauthorized