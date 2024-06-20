const { createNewLink, findLinkByOriginalURLByUserId, deleteLinkByUserId } = require("../database/tables/links.table");
const { generateJsonResponse } = require("../utils/generateResponse");
const { isValidUrl, getShortedURL } = require("../utils/UrlHelper");
require("dotenv").config()

// get SHORTCUT_URL from enoviroment variable 
const SHORTCUT_URL_DOMAIN = process.env.SHORTCUT_URL_DOMAIN ?? "localhost";


// handle create link
const createShortLink = async (req, res) => {
    try {
        // get url from body 
        const url = req.body?.url;

        // getting userid from middleware
        const userId = req?.userId;

        // check url valid or not 
        const isValidURL = isValidUrl(url);

        // if url not valid 
        if (!isValidURL) {
            // send error resonse 
            return generateJsonResponse(res, "url", "Invalid Url", null, true, 400);
        }

        // first check user alrady url created or not
        const isUrlCurrentCreated = await findLinkByOriginalURLByUserId(url, userId);

        // send old alrady created response 
        if (isUrlCurrentCreated?.results?.length == 1) {
            let { link_id: linkId, original_url: originalUrl, shorted_url: shortedURL } = isUrlCurrentCreated.results[0];
            return generateJsonResponse(res, "success", "URL alraday crated", { linkId, originalUrl, shortedURL }, false, 200);
        }

        // create shortedUrl url string
        const { shortedURL, uniqId } = getShortedURL(SHORTCUT_URL_DOMAIN, 12);

        // finally create new link
        const storeLinkInDB = await createNewLink({ user_id: userId, original_url: url, shorted_url: shortedURL, urlUniqId: uniqId })

        // if link not created 
        if (!storeLinkInDB || storeLinkInDB?.results?.affectedRows != 1) {
            return generateJsonResponse(res, "error", "An error occurred while creating the user", null, true, 500);
        }

        // get user insert id 
        const linkId = storeLinkInDB.results.insertId;

        // last success response 
        return generateJsonResponse(res, "success", "Link created successfully", { linkId, shortedURL }, false, 200);
    } catch (error) {
        return generateJsonResponse(res, "error", "An error occurred while processing the request", null, true, 500);
    }
}

// handle delete link
const deleteShortLink = async (req, res) => {
    try {
        let { deleteId } = req.body;
        let userId = req?.userId

        // validation for deleteId
        if (typeof (deleteId) != 'number') {
            return generateJsonResponse(res, "error", "Invalid Field", null, true, 400, [{ type: "fields", value: deleteId, msg: "link id must be number", path: "deleteId", "location": "body" }])
        }

        // delete link From DB
        let isLinkDeleted = await deleteLinkByUserId(userId, deleteId)

        // if link not created 
        if (!isLinkDeleted || isLinkDeleted?.results?.affectedRows != 1) {
            return generateJsonResponse(res, "error", "link not found", null, true, 500);
        }

        // deleted successfull resoponse 
        return generateJsonResponse(res, "success", "Link deleted successfully", { linkId: deleteId }, false, 200);
    } catch (error) {
        return generateJsonResponse(res, "error", "An error occurred while processing the request", null, true, 500);
    }
}

module.exports = { createShortLink, deleteShortLink }