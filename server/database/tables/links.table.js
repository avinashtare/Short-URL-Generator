const { db_query } = require("../query");

const createLinksTable = async () => {
    const createLinksTableQuery = `
        CREATE TABLE IF NOT EXISTS links (
            link_id INT AUTO_INCREMENT PRIMARY KEY,
            original_url TEXT NOT NULL,
            shortened_url VARCHAR(255) NOT NULL,
            user_id INT,
            clicks_count INT DEFAULT 0,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
        );
    `;

    const is_links_created = await db_query(createLinksTableQuery);
    if (!is_links_created) {
        return false;
    }
    return is_links_created;
}

const createNewLink = async ({ user_id, original_url, shortened_url }) => {
    const createNewLinkQeury = `INSERT INTO links (original_url, shortened_url, user_id) VALUES ('${original_url}', '${shortened_url}', ${user_id});`;

    const is_link_created = await db_query(createNewLinkQeury);

    if (!is_link_created) {
        return false;
    }
    return is_link_created;
}

const findLinksByUserId = async (user_id) => {
    const findLinkByUserIdQuery = `SELECT * FROM links WHERE user_id=${user_id};`;

    const is_link_exist = await db_query(findLinkByUserIdQuery);

    if (!is_link_exist) {
        return false;
    }
    else if (is_link_exist?.results.length == 0) {
        return false
    }
    return is_link_exist;
}


const findLinkByOriginalURL = async (original_url) => {
    const findLinkByOriginalURLQuery = `SELECT * FROM links WHERE original_url='${original_url}';`;

    const is_url_exist = await db_query(findLinkByOriginalURLQuery);

    if (!is_url_exist) {
        return false;
    }
    else if (is_url_exist?.results.length == 0) {
        return false
    }
    return is_url_exist;
}

const deleteLinkById = async (link_id) => {
    const deleteLinkQuery = `DELETE FROM links WHERE link_id=${link_id};`
    const is_link_deleted = await db_query(deleteLinkQuery);

    if (!is_link_deleted) {
        return false;
    }
    else if (is_link_deleted?.results?.affectedRows == 0) {
        return false;
    }
    return is_link_deleted;
}

module.exports = { createLinksTable, createNewLink, findLinksByUserId, findLinkByOriginalURL, deleteLinkById }