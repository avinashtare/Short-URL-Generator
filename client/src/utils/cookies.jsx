export const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');

    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');

        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }

    return null;
}

export const setCookie = (cookieName, cookieValue) => {
    // Construct the cookie string
    const cookieString = encodeURIComponent(cookieName) + '=' + encodeURIComponent(cookieValue);

    // Check if the cookie already exists
    const cookies = document.cookie.split(';');
    let cookieExists = false;

    cookies.forEach(cookie => {
        const trimmedCookie = cookie.trim();
        if (trimmedCookie.startsWith(`${encodeURIComponent(cookieName)}=`)) {
            cookieExists = true;
        }
    });

    // Set or update the cookie
    if (cookieExists) {
        // Update existing cookie
        document.cookie = cookieString + '; path=/';
    } else {
        // Set new cookie
        document.cookie = cookieString + '; path=/';
    }

    // Check if the cookie was successfully set or updated
    const updatedCookies = document.cookie.split(';');
    let success = false;

    updatedCookies.forEach(cookie => {
        const trimmedCookie = cookie.trim();
        if (trimmedCookie.startsWith(`${encodeURIComponent(cookieName)}=${encodeURIComponent(cookieValue)}`)) {
            success = true;
        }
    });

    return success;
}


export const clearCookie = (cookieName) => {
    // Check if the cookie exists
    const cookieExists = document.cookie.split(';').some(cookie => {
        return cookie.trim().startsWith(encodeURIComponent(cookieName) + '=');
    });

    if (cookieExists) {
        // Set the cookie to expire in the past (effectively deleting it)
        document.cookie = encodeURIComponent(cookieName) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        return true; // Deleted successfully
    } else {
        return false; // Cookie with the specified name doesn't exist
    }
}
