"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var schema = new Schema({
    length: Number,
    spicy: Boolean
});

module.exports = mongoose.model("Shaihulud", schema);
