const { db } = require("./src/models/index.js")
const { start } = require("./src/server")
require("dotenv").config();

db.sync()
    .then(() => {
        console.log("database running")
        server.start(process.env.PORT);
    })
    .catch(console.error);