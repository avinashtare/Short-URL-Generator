const express = require('express');
const router = express.Router();
const user = require("./user.route");
const links = require("./links.route");
const  linksRedirect = require("./linksRedirect.route");
// user routes
router.use("/user", user);

// short links route
router.use("/links", links);

// links redirect route
router.use("/t", linksRedirect);

module.exports = router