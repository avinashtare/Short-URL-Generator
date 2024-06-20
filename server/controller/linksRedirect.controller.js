const { findLinksByUniqId, incrementLinksCount } = require("../database/tables/links.table");

const handleLinksRedirect = async (req, res) => {
    try {

        const urlUniqId = (req.params.path);

        if (typeof (urlUniqId) != "string") {
            return res.status(400).json({
                message: "Method Not Allowed"
            });
        }

        // check the link uniq id in database 
        const isLinkExist = await findLinksByUniqId(urlUniqId);

        // if user link not exist 
        if (!isLinkExist) {
            return res.status(400).json({
                message: "Method Not Allowed"
            });
        }

        // get data from db
        let { link_id, original_url } = isLinkExist.results[0];

        // increment click count synchronously
        incrementLinksCount(link_id)
        // set redirect header 
        res.setHeader("Location", original_url);
        return res.status(302).end();

    } catch (error) {
        return generateJsonResponse(res, "error", "An error occurred while processing the request", null, true, 500);
    }
}

// require("express").Router().get("/",(req,res)=>{res.setHeader()})
module.exports = handleLinksRedirect;