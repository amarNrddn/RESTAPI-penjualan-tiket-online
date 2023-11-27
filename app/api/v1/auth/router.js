const express = require("express")
const router = express()
const {siginCMS} = require("./controller")

router.post("/auth/sigin", siginCMS)

module.exports = router