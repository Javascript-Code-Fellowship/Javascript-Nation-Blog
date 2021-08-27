//basic initialization
const express = require("express");
const app = express();
const errorHandler = require("./error-handlers/error-handler")
app.use(express.json())


//import all the routes into here
//import error handler


app.use(errorHandler)

function start(port) {
    app.listen(port, () => {
        console.log(`server listening on ${port}`)
    })
}

module.exports = {
    app,
    start
}