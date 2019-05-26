"use strict";

// I use bluebird promises instead of the builtin Node promises
// http://bluebirdjs.com/docs/api-reference.html
const Promise = require("bluebird");
const mongoose = require("mongoose");

const config = require("./config");
const app = require("./app");

// Replace this with whichever logged you want to use
const logger = console;

logger.info("Server process starting");

logger.info("Loading Mongoose");

// Connect to MongoDB
// https://mongoosejs.com/docs/connections.html
mongoose.Promise = Promise;
mongoose.connect(config.mongo.uri, { useNewUrlParser: true, promiseLibrary: Promise });

mongoose.connection.on("error", function() {
    logger.error("Mongoose connection error");
});
mongoose.connection.once("open", function() {
    logger.info("Mongoose connected to the database");
});

mongoose.set("useFindAndModify", false);

// Start http server for Express
// https://expressjs.com/en/api.html#app.listen
app.listen(config.api.port, config.api.ip, function() {
    logger.info("backend is listening on http://" + config.api.ip + ":" + config.api.port);
})
    .on("error", function(error) {
        logger.error("Unable to listen for connections: ", error);
        process.exit(10);
    });
