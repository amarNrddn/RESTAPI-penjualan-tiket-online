const express = require('express')
const router = express()
const { index } = require('./controler')

router.get('/refresh-token/:refreshToken/:email', index)

module.exports = router