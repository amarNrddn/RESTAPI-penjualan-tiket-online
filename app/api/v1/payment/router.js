const express = require("express")
const router = express()
const { authenticateUser, authorizeRoles } = require("../../../middlewares/auth")
const {
    create,
    index,
    find,
    update,
    destroy
} = require("./controller")

router.post(
    "/payment",
    authenticateUser,
    authorizeRoles('organizer'),
    create
)

router.get(
    "/payment",
    authenticateUser,
    authorizeRoles('organizer'),
    index
)

router.get(
    "/payment/:id",
    authenticateUser,
    authorizeRoles('organizer'),
    find
)

router.put(
    "/payment/:id",
    authenticateUser,
    authorizeRoles('organizer'),
    update
)

router.delete(
    "/payment/:id",
    authenticateUser,
    authorizeRoles('organizer'),
    destroy
)

module.exports = router