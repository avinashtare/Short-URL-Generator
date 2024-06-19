module.exports = json_error_handler = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        // Handle JSON parse error
        return res.status(400).json({ message: 'Invalid JSON', error: true });
    }

    // Forward to the next middleware if it's not a JSON parse error
    next(err);
}