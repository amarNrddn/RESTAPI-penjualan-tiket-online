const express = require('express')
const router = express()

//product controller
const { create, getAllCategory, find, update, destroy } = require('./controller')
const { authenticateUser, authorizeRoles } = require("../../../middlewares/auth")


router.post(
    '/categories',
    authenticateUser,
    authorizeRoles('organizer'),
    create
)
router.get(
    '/categories/:id',
    authenticateUser,
    authorizeRoles('organizer'),
    find
)

router.get(
    '/categories',
    authenticateUser,
    authorizeRoles('organizer'),
    getAllCategory
)

router.put(
    '/categories/:id',
    authenticateUser,
    authorizeRoles('organizer'),
    update
)

router.delete(
    '/categories/:id',
    authenticateUser,
    authorizeRoles('organizer'),
    destroy
)

module.exports = router