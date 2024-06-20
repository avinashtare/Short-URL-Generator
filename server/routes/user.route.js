const express = require('express');
const { CreateUser, SignInUser } = require('../controller/user.controller');
const { validateSignUpUser, validateSignInUser } = require('../controller/validator/user.validate');
const router = express.Router();

// handle create user 
router.post("/signup", validateSignUpUser, CreateUser);

// handle signin user 
router.post("/signin", validateSignInUser, SignInUser);

module.exports = router;