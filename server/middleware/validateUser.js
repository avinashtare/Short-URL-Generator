/*
validate user 
first fetch token from cookie
second check user email address exist in db
third pass next fucntion
*/
const { findUserByIdDB } = require("../database/tables/users.table");
const { generateJsonResponse } = require("../utils/generateResponse");
const { findIdByJwt } = require("../utils/jwtHandler");


const validateUser = async (req, res, next) => {
    try {
        // get token from cookie or headers
        let token = req.headers?.token;
        if(!token) token = req.cookies?.token

        // check token exsit or not
        if (!token) {
            return generateJsonResponse(res, "error", "invalid user", {isValidUser: false}, true, 400);
        }

        // fetch data from token 
        const jwtResponseUserId = findIdByJwt(token).userId;

        // check jwt user id exist or not 
        if (!jwtResponseUserId) {
            return generateJsonResponse(res, "error", "invalid user", {isValidUser: false}, true, 400);
        }

        // check user is exist on server or no
        let userExist = await findUserByIdDB(jwtResponseUserId);

        // check jwt user id exist or not 
        if (!userExist) {
            return generateJsonResponse(res, "error", "invalid user", {isValidUser: false}, true, 400);
        }

        // set user id in request prams 
        req.userId = jwtResponseUserId;

        // check client checking user valid using params
        if(req.url == "/is-valid-user"){
            return generateJsonResponse(res,"success","valid is user",{isValidUser: true},false,200);
        }

        // calling next function 
        next();
    } catch (error) {
        return generateJsonResponse(res, "error", "An error occurred while processing the request", null, true, 500);
    }
}

module.exports = validateUser;