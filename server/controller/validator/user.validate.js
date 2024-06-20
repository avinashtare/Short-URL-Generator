const { body } = require("express-validator")

const validateSignUpUser = [
    body('email').isLength({ min: 5, max: 40 }).isEmail(),

    body('password').isLength({ min: 8, max: 255 }).isString(),
    
    body("full_name").isString().isLength({ min: 3, max: 40 }).matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/)
];

const validateSignInUser = [
    body('email').isLength({ min: 5, max: 40 }).isEmail(),
    body('password').isLength({ min: 8, max: 255 }).isString(),    
];



module.exports = { validateSignUpUser,validateSignInUser }