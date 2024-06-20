const { Connect_To_DB } = require("./connect_db");

const db_query = async (query) => {
    // Connect to the database

    const connection = await Connect_To_DB()
    return new Promise((resolve, reject) => {
        try {
            // Execute the query
            connection.query(query, function (error, results, fields) {
                // // commit(save) changes
                // connection.commit()

                // Ensure the connection is closed after the query is executed
                connection.end();

                if (error) {
                    // Reject the promise in case of an error
                    resolve(false);
                }
                else {
                    // Resolve the promise with the results and fields
                    resolve({ results, fields })
                }
            })

        } catch (error) {
            resolve(false)
        }
    })

}

module.exports = { db_query }