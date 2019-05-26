"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var schema = new Schema({
    age: Number,
    snacks: [{
        name: String,
        gender: String,
        isClone: Boolean
    }]
});

module.exports = mongoose.model("Sarlacc", schema);
