"use strict";

var config = {};

config.isProduction = process.env.NODE_ENV === "production";

config.mongo = {
    uri: "mongodb://localhost:27017/backend"
};

config.api = {
    ip: "127.0.0.1",
    port: 3000
};

module.exports = config;
