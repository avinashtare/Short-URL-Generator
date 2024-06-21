const express = require('express');
const { CreateUser, SignInUser } = require('../controller/user.controller');
const { validateSignUpUser, validateSignInUser } = require('../controller/validator/user.validate');
const validateUser = require('../middleware/validateUser');
const router = express.Router();

// handle create user 
router.post("/signup", validateSignUpUser, CreateUser);

// handle signin user 
router.post("/signin", validateSignInUser, SignInUser);

// handle user is valid
router.post("/is-valid-user", validateUser);

module.exports = router;