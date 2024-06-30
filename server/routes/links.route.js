const express = require('express');
const validateUser = require('../middleware/validateUser');
const { createShortLink, deleteShortLink, getShortLinks } = require('../controller/links.controller');
const router = express.Router();

// handle create user 
router.post("/create-short-url", validateUser, createShortLink);

// delete link
router.post("/get-links", validateUser, getShortLinks);

// delete link
router.post("/delete-link", validateUser, deleteShortLink);

module.exports = router;