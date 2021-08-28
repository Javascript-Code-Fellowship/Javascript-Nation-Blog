//basic initialization
const express = require("express");
const app = express();
const errorHandler = require("./error-handlers/error-handler")
const authRouter = require("./routes/authRoutes")
const resourceRouter = require("./routes/resourceRoutes")
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(authRouter)
app.use(resourceRouter)




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