const express = require("express")
const router = express()
const { authenticateUser, authorizeRoles, authenticateParticipant } = require("../../../middlewares/auth")
const {
    siginup,
    activeParticipant,
    sigin,
    getAllLendingPage, 
    getDetailLendingPage,
    getDashboard,
    checkout
} = require("./controller")

router.post("/auth/siginup", siginup)
router.post("/auth/sigin", sigin)
router.put("/active", activeParticipant)
router.get("/events", getAllLendingPage)
router.get("/events/:id", getDetailLendingPage)
router.get("/order", authenticateParticipant, getDashboard)
router.post("/checkout", authenticateParticipant, checkout)

module.exports = router