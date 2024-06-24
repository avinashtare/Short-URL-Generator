const { validationResult } = require("express-validator");
const { createUserDB, findUserByEmailDB, deleteUserByIdDB } = require("../database/tables/users.table");
const { CreatePasswrodHash, ValidatePasswrodHash } = require("../utils/passwordHelper");
const { generateJsonResponse } = require("../utils/generateResponse");
const { createJwtById } = require("../utils/jwtHandler");

const CreateUser = async (req, res) => {
    try {
        const request_error = validationResult(req);

        // first check error exist or not if exist throw error response
        if (!request_error.isEmpty()) {
            return generateJsonResponse(res, 400, "Invalid Field", null, true, 400, request_error.errors);
        };

        // get data from body 
        const { email, password, full_name } = req.body;

        // first check in db email exist or not 
        const isEmailExist = await findUserByEmailDB(email);

        // if email already exist handle the error 
        if (isEmailExist) {
            return generateJsonResponse(res, "email exist", "Email address already exists", null, true, 400);
        }

        // encrypt password
        const encryptedPassword = await CreatePasswrodHash(password);

        // finally create user
        const isUserCreated = await createUserDB({ email, password: encryptedPassword, full_name });

        // if user not created 
        if (!isUserCreated || isUserCreated?.results?.affectedRows != 1) {
            return generateJsonResponse(res, "error", "An error occurred while creating the user", null, true, 500);
        }

        // get user insert id 
        const userId = isUserCreated.results.insertId;

        // create token
        const jwtToken = createJwtById(userId);

        // if jwt not works delete this user from db
        if (!jwtToken) {
            deleteUserByIdDB(userId);
            return generateJsonResponse(res, "error", "An error occurred while creating the user", null, true, 500);
        }

        // send user response 
        return generateJsonResponse(res, "success", "User registered successfully",  jwtToken , false, 200);

    } catch (error) {
        return generateJsonResponse(res, "error", "An error occurred while processing the request", null, true, 500);
    }
}

const SignInUser = async (req, res) => {
    try {
        const request_error = validationResult(req);

        // first check error exist or not if exist throw error response
        if (!request_error.isEmpty()) {
            return generateJsonResponse(res, "error", "Invalid Field", null, true, 400, request_error.errors);
        };

        // get data from body 
        const { email, password } = req.body;

        // first check in db email exist or not 
        const findUser = await findUserByEmailDB(email);

        // if email not exist handle the error 
        if (!findUser || findUser?.results.length != 1) {
            return generateJsonResponse(res, "error", "Invalid email and password", null, true, 400);
        }

        // get values from email table 
        const { user_id, password_hash } = findUser.results[0];

        // compare password 
        const isValidPassword = await ValidatePasswrodHash(password, password_hash);

        // if password is worong
        if (!isValidPassword) {
            return generateJsonResponse(res, "error", "Invalid email and password", null, true, 400);
        }

        // create token
        const jwtToken = createJwtById(user_id);

        // send reponse with token
        return generateJsonResponse(res, "success", "User sign in successfully", jwtToken , false, 200);
    } catch (error) {
        return generateJsonResponse(res, "error", "An error occurred while processing the request", null, true, 500);
    }
}

module.exports = { CreateUser, SignInUser }