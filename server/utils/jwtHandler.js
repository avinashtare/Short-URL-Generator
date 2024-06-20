const jwt = require('jsonwebtoken');
require("dotenv").config();
const SecretKey = process.env.SecretKey;


const createJwtById = (userId) => {
    try {
        const JwtToken = jwt.sign({ id: userId }, SecretKey, { expiresIn: '60d' }); //3 months

        // return jwt token 
        return { token: JwtToken };
    } catch (error) {
        return { token: false };
    }
}

const findIdByJwt = (token) => {
    try {
        // verify id
        const JwtVerify = jwt.verify(token,SecretKey);
        const userId = JwtVerify.id;

        // return id 
        return { userId };
    } catch (error) {
        return { userId: false };
    }
}



module.exports = { createJwtById, findIdByJwt}