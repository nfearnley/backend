"use strict";

const Promise = require("bluebird");
const createError = require("http-errors");
const expressPromiseRouter = require("express-promise-router");

const Scrib = require("../models/scrib");

const router = expressPromiseRouter();

function createScrib(req, res) {
    return Promise.try(function() {
        var scribBody = req.body;

        return Scrib.create(scribBody)
            .then(function(savedScrib) {
                res.status(200).send(savedScrib);
            });
    });
}

function getScribs(req, res) {
    return Promise.try(function() {
        return Scrib.find()
            .exec()
            .then(function(scribs) {
                res.status(200).send(scribs);
            });
    });
}

function getScrib(req, res) {
    return Promise.try(function() {
        var scribId = req.params.scribId;

        return Scrib.findById(scribId)
            .populate("scriblings")
            .exec()
            .then(function(scrib) {
                if (!scrib) {
                    throw createError(404, "scrib not found");
                }

                res.status(200).send(scrib);
            });
    });
}

function updateScrib(req, res) {
    return Promise.try(function() {
        var scribId = req.params.scribId;
        var scribChanges = req.body;

        return Scrib.findByIdAndUpdate(scribId, scribChanges)
            .setOptions({ new: true })
            .exec()
            .then(function(scrib) {
                if (!scrib) {
                    throw createError(404, "scrib not found");
                }

                res.status(200).send(scrib);
            });
    });
}

function deleteScrib(req, res) {
    return Promise.try(function() {
        var scribId = req.params.scribId;

        return Scrib.findByIdAndDelete(scribId)
            .exec()
            .then(function(scrib) {
                if (!scrib) {
                    throw createError(404, "scrib not found");
                }

                res.status(204).send();
            });
    });
}

router.post("/scrib", createScrib);
router.get("/scrib", getScribs);
router.get("/scrib/:scribId", getScrib);
router.put("/scrib/:scribId", updateScrib);
router.delete("/scrib/:scribId", deleteScrib);

module.exports = router;
