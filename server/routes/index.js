const express = require('express')
const router = express.Router()
const user = require("./user.route")
const links = require("./links.route")

// user routes
router.use("/user", user);

// short links route
router.use("/links", links)

module.exports = router