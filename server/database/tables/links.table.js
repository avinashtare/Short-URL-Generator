const { db_query } = require("../query");

const createLinksTable = async () => {
    const createLinksTableQuery = `
        CREATE TABLE IF NOT EXISTS links (
            link_id INT AUTO_INCREMENT PRIMARY KEY,
            original_url TEXT NOT NULL,
            shorted_url VARCHAR(255) NOT NULL,
            url_uniq_id VARCHAR(255) NOT NULL UNIQUE,
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

const createNewLink = async ({ user_id, original_url, shorted_url, urlUniqId }) => {
    const createNewLinkQeury = `INSERT INTO links (original_url, shorted_url, url_uniq_id, user_id) VALUES ('${original_url}', '${shorted_url}','${urlUniqId}', ${user_id});`;

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

const findLinksByUniqId = async (urlUniqId) => {
    const findLinksByUniqIdQuery = `SELECT * FROM links WHERE url_uniq_id='${urlUniqId}';`;

    const is_link_exist = await db_query(findLinksByUniqIdQuery);

    if (!is_link_exist) {
        return false;
    }
    else if (is_link_exist?.results.length == 0) {
        return false
    }

    return is_link_exist;
}


const findLinkByOriginalURLByUserId = async (original_url, user_id) => {
    const findLinkByOriginalURLByUserIdQuery = `SELECT * FROM links WHERE user_id=${user_id} AND original_url='${original_url}';`;

    const is_url_exist = await db_query(findLinkByOriginalURLByUserIdQuery);

    if (!is_url_exist) {
        return false;
    }
    else if (is_url_exist?.results.length == 0) {
        return false
    }
    return is_url_exist;
}

const incrementLinksCount = async (link_id) => {
    const incrementLinksCountQuery = `UPDATE links SET clicks_count = clicks_count + 1 WHERE link_id=${link_id};`
    const is_count_updated = await db_query(incrementLinksCountQuery);

    if (!is_count_updated) {
        return false;
    }
    else if (is_count_updated?.results?.affectedRows == 0) {
        return false;
    }

    return is_count_updated;
}

const deleteLinkByUserId = async (user_id, link_id) => {
    const deleteLinkQuery = `DELETE FROM links WHERE user_id=${user_id} AND link_id=${link_id};`
    const is_link_deleted = await db_query(deleteLinkQuery);

    if (!is_link_deleted) {
        return false;
    }
    else if (is_link_deleted?.results?.affectedRows == 0) {
        return false;
    }
    return is_link_deleted;
}

module.exports = { createLinksTable, createNewLink, findLinksByUserId, findLinkByOriginalURLByUserId, deleteLinkByUserId, findLinksByUniqId,incrementLinksCount }