const { db_query } = require("../query");


const createUsersTable = async () => {
    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(30) NOT NULL,
            email_address VARCHAR(40) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            account_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const is_user_table_created = await db_query(createUsersTableQuery);
    if (!is_user_table_created) {
        return false;
    }
    return is_user_table_created;
}

const createUserDB = async ({ full_name, email, password }) => {
    const createUserQuery = `INSERT INTO users (full_name, email_address, password_hash) VALUES ('${full_name}', '${email}', '${password}');`;
    const is_user_created = await db_query(createUserQuery);
    if (!is_user_created) {
        return false;
    }
    return is_user_created;
}

const findUserByIdDB = async (user_id) => {
    const findUserQuery = `SELECT * FROM users WHERE user_id=${user_id} LIMIT 1; `
    const is_user_exist = await db_query(findUserQuery);

    if (!is_user_exist) {
        return false;
    }
    else if (is_user_exist?.results.length == 0) {
        return false
    }
    return is_user_exist;
}

const findUserByEmailDB = async (email) => {
    const findUserByEmailQuery = `SELECT * FROM users WHERE email_address='${email}' LIMIT 1; `
    const is_user_exist = await db_query(findUserByEmailQuery);

    if (!is_user_exist) {
        return false;
    }
    else if (is_user_exist?.results.length == 0) {
        return false
    }
    return is_user_exist;
}

const deleteUserByIdDB = async (user_id) => {
    const deleteUserQuery = `DELETE FROM users WHERE user_id=${user_id};`
    const is_user_deleted = await db_query(deleteUserQuery);

    if (!is_user_deleted) {
        return false;
    }
    else if (is_user_deleted?.results?.affectedRows == 0) {
        return false;
    }
    return is_user_deleted;
}


module.exports = { createUsersTable, createUserDB, findUserByIdDB, deleteUserByIdDB,findUserByEmailDB }