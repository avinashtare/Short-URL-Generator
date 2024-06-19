const { createUsersTable } = require("./users.table");
const { createLinksTable } = require("./links.table");

/**
 * Create all database tables.
 */
const createAllTables = async () => {
    try {
        // Create the users table
        const usersTableResult = await createUsersTable();
        if (usersTableResult.results.warningCount == 0) {
            console.log("Users table created successfully.");
        } else if(!usersTableResult) {
            console.log("Failed to create users table.");
        }

        // Create the links table
        const linksTableResult = await createLinksTable();
        if (linksTableResult.results.warningCount == 0) {
            console.log("Links table created successfully.");
        } else if(!linksTableResult) {
            console.log("Failed to create links table.");
        }
    } catch (error) {
        console.error("Error creating tables:", error.message);
    }
};

module.exports = { createAllTables };