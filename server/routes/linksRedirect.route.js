const express = require('express');
const router = express.Router();
const handleLinksRedirect = require('../controller/linksRedirect.controller');

// handle redirection
router.get("/:path", handleLinksRedirect);

module.exports = router;