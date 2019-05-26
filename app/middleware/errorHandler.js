"use strict";

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    var message = err;
    if (err instanceof Error) {
        message = err.message;
    }

    if (message) {
        // Send message
        return res.status(500).send(message);
    }
    else {
        // If message is empty, send generic error message
        return res.sendStatus(500);
    }
}

module.exports = errorHandler;
