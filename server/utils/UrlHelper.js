const validator = require('validator');

const isValidUrl = (urlString) => {
    // Regular expression to check for valid domain names
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Add protocol if missing
    let urlToTest = urlString;
    if (!/^https?:\/\//i.test(urlString)) {
        urlToTest = 'http://' + urlString;
    }

    // Validate the full URL
    if (!validator.isURL(urlToTest, { protocols: ['http', 'https'], require_protocol: true })) {
        return false;
    }

    // Extract the hostname to validate it separately
    try {
        const parsedUrl = new URL(urlToTest);
        return domainRegex.test(parsedUrl.hostname);
    } catch (err) {
        return false;
    }
}

const generateUniqueId = (length = 12) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const getShortedURL = (domain,length=12)=>{
    const uniqId = generateUniqueId(length);
    return {shortedURL: domain + "/" + "t/" + uniqId,uniqId};
}


module.exports = { isValidUrl, getShortedURL }