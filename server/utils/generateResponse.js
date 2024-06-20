const generateJsonResponse = (res, status, message, data = null, error = false, statusCode = 200, errors = null) => {
    const response = {
        status: status,
        message: message,
        error: error
    };

    // Only include data key if data is provided
    if (data !== null) {
        response.data = data;
    }

    // Only include errors key if error is true and errors are provided
    if (error && errors !== null) {
        response.errors = errors;
    }

    return res.status(statusCode).json(response);
};

module.exports = { generateJsonResponse };