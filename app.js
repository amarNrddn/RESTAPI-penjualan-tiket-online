const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser');
const logger = require('morgan')
const errorHendelerMiddlewares = require('./app/middlewares/hendeler-error')
const NotFound = require('./app/middlewares/not-found')
const cors = require("cors")

const app = express();

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

// router
const categories = require('./app/api/v1/categories/router')
const images = require("./app/api/v1/images/router")
const talentsRouter = require("./app/api/v1/talents/router")
const eventsRouter = require("./app/api/v1/event/router")
const organizersRouter = require("./app/api/v1/organizers/router")
const authCMSRouter = require("./app/api/v1/auth/router")
const ordersRouter = require("./app/api/v1/orders/router")
const partisipantsRouter = require("./app/api/v1/participants/router")
const paymentsRouter = require("./app/api/v1/payment/router")
const uesrRefreTokenshRouter = require("./app/api/v1/userRefreshToken/router")

const v1 = '/api/v1'

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'testing nodemon',
    })
})

app.use(`${v1}/cms`, categories)
app.use(`${v1}/cms`, images)
app.use(`${v1}/cms`, talentsRouter)
app.use(`${v1}/cms`, eventsRouter)
app.use(`${v1}/cms`, organizersRouter)
app.use(`${v1}/cms`, authCMSRouter)
app.use(`${v1}/cms`, ordersRouter)
app.use(`${v1}/cms`, paymentsRouter)
app.use(`${v1}`, partisipantsRouter)
app.use(`${v1}`, uesrRefreTokenshRouter)

// hendele error midelware
app.use(errorHendelerMiddlewares)
app.use(NotFound)

module.exports = app