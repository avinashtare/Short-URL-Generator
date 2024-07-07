var mysql = require('mysql');
require("dotenv").config(); // Load environment variables from .env file

// Get database connection details from environment variables
const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT || 3306;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE_NAME;

// Function to connect to the MySQL database
const Connect_To_DB = async () => {
    return new Promise((resolve, reject) => {
        // Create a new MySQL connection using the connection details
        const connection = mysql.createConnection({
            host,
            port,
            user,
            password,
            database
        });

        try {
            // Attempt to connect to the database
            connection.connect((err) => {
                if (err) {
                    console.log("SQL Connection Error: ",err);
                    // Reject the promise if there is an error
                    resolve(false)
                } else {
                    // Resolve the promise with the connection if successful
                    resolve(connection);
                }
            });
        } catch (err) {
            // Reject the promise if there is an unexpected error in try block
            resolve(false);
        }
    });
};

// Export the Connect_To_DB function for use in other modules
module.exports = { Connect_To_DB };