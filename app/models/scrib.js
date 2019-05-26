"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
    name: String,
    sound: { type: String, default: "SKREEEE" },
    threatLevel: { type: String, enum: ["harmless", "mostly harmless"], default: "harmless" },
    scriblings: [{ type: ObjectId, ref: "Scrib" }],
    isHungry: Boolean
});

module.exports = mongoose.model("Scrib", schema);
