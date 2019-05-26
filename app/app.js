"use strict";

const express = require("express");

const sarlaccRouter = require("./routers/sarlacc");
const scribRouter = require("./routers/scrib");
const shaihuludRouter = require("./routers/shaihulud");

const httpErrorHandler = require("./middleware/httpErrorHandler");
const errorHandler = require("./middleware/errorHandler");

var app = express();

// Parse incoming JSON
app.use(express.json());

// The routes to handle the REST calls
app.use("/api", sarlaccRouter);
app.use("/api", scribRouter);
app.use("/api", shaihuludRouter);

// Send the user any errors that might have slipped by
app.use(httpErrorHandler);
app.use(errorHandler);

module.exports = app;
