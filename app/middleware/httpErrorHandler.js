"use strict";

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    // Only handle Error objects
    if (!(err instanceof Error)) {
        return next(err);
    }

    // Only handle valid status codes (range 100 to 599)
    if (!(err.status && typeof err.status === "number" && err.status >= 100 && err.status <= 599)) {
        return next(err);
    }

    if (err.message) {
        // Send message
        return res.status(err.status).send(err.message);
    }
    else {
        // If message is empty, send generic error message
        return res.sendStatus(err.status);
    }
}

module.exports = errorHandler;
