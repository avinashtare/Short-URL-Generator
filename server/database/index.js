const { Connect_To_DB } = require("./connect_db")
const { createAllTables } = require("./tables")

const check_db_connection = async () => {
    const is_db_start = await Connect_To_DB();
    if (is_db_start) {
        // close connection 
        is_db_start.end();

        console.log("Database Connected successfully.");
        // Create all tables
        createAllTables()
    }
    else {
        console.log("Failed To Connected Database.");

        // try to connect db after 10 second
        setTimeout(() => {
            check_db_connection()
        }, 10000);
    }
}

module.exports = { check_db_connection, Connect_To_DB }