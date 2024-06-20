const bcrypt = require('bcrypt');
const saltRounds = 10;

const CreatePasswrodHash = async (password) => {
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(password, salt);
    return hash;
}

const ValidatePasswrodHash = async (password, hash) => {
    try {
        let result = await bcrypt.compare(password, hash);
        return result;

    } catch (error) {
        return false;
    }
}

module.exports = { CreatePasswrodHash, ValidatePasswrodHash }