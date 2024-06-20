const validator = require('validator');

const isValidUrl = (urlString) => {
    // Regular expression to check for valid domain names
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Ensure the URL starts with http:// or https://
    if (!/^https?:\/\//i.test(urlString)) {
        return false;
    }

    // Validate the full URL using validator
    if (!validator.isURL(urlString, { protocols: ['http', 'https'], require_protocol: true })) {
        return false;
    }

    // Extract the hostname to validate it separately
    try {
        const parsedUrl = new URL(urlString);
        // Check if the hostname is a valid domain name (excluding IP addresses)
        if (!domainRegex.test(parsedUrl.hostname)) {
            return false;
        }
        // Check if the hostname is an IP address
        if (parsedUrl.hostname.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)) {
            return false;
        }
        return true;
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