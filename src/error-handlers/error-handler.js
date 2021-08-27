async function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    console.log(err);
    const message = err.message || "an unknown server error occurred";
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({ message: message });
}

module.exports = errorHandler;