//this class basically just extends the error class and adds one extra property, status code
//so to call one of these you go: return next(new HttpError("message",404)); or whatever code obviously

class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}


module.exports = HttpError;