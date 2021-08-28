async function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
        //kill the process dont do anything     
    }
    console.log(err);
    //so now the error that we gave a status code and a message is picked up here and deconstructed into a response

    const message = err.message || "an unknown server error occurred";
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({ message: message });
}

module.exports = errorHandler;