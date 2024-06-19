const express = require('express')
const { CreateUser } = require('../controller/user.controller')
const router = express.Router()

router.put("/create_user", CreateUser)

module.exports = router