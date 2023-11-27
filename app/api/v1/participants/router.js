const express = require("express")
const router = express()
const {authenticateParticipant } = require("../../../middlewares/auth")
const {
    siginup,
    activeParticipant,
    sigin,
    getAllLendingPage, 
    getDetailLendingPage,
    getDashboard,
    checkout,
    getAllPayment
} = require("./controller")

router.post("/auth/siginup", siginup)
router.post("/auth/sigin", sigin)
router.put("/active", activeParticipant)
router.get("/events", getAllLendingPage)
router.get("/events/:id", getDetailLendingPage)
router.get('/payments/:organizer', authenticateParticipant, getAllPayment)
router.get("/orders", authenticateParticipant, getDashboard)
router.post("/checkout", authenticateParticipant, checkout)

module.exports = router