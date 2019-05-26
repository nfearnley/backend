"use strict";

const Promise = require("bluebird");
const createError = require("http-errors");
const expressPromiseRouter = require("express-promise-router");

const Shaihulud = require("../models/shaihulud");

const router = expressPromiseRouter();

function createShaihulud(req, res) {
    return Promise.try(function() {
        var shaihuludBody = req.body;

        return Shaihulud.create(shaihuludBody)
            .then(function(savedShaihulud) {
                res.status(200).send(savedShaihulud);
            });
    });
}

function getShaihuluds(req, res) {
    return Promise.try(function() {
        return Shaihulud.find()
            .exec()
            .then(function(shaihuluds) {
                res.status(200).send(shaihuluds);
            });
    });
}

function getShaihulud(req, res) {
    return Promise.try(function() {
        var shaihuludId = req.params.shaihuludId;

        return Shaihulud.findById(shaihuludId)
            .exec()
            .then(function(shaihulud) {
                if (!shaihulud) {
                    throw createError(404, "shaihulud not found");
                }

                res.status(200).send(shaihulud);
            });
    });
}

function updateShaihulud(req, res) {
    return Promise.try(function() {
        var shaihuludId = req.params.shaihuludId;
        var shaihuludChanges = req.body;

        return Shaihulud.findByIdAndUpdate(shaihuludId, shaihuludChanges)
            .setOptions({ new: true })
            .exec()
            .then(function(shaihulud) {
                if (!shaihulud) {
                    throw createError(404, "shaihulud not found");
                }

                res.status(200).send(shaihulud);
            });
    });
}

function deleteShaihulud(req, res) {
    return Promise.try(function() {
        var shaihuludId = req.params.shaihuludId;

        return Shaihulud.findByIdAndDelete(shaihuludId)
            .exec()
            .then(function(shaihulud) {
                if (!shaihulud) {
                    throw createError(404, "shaihulud not found");
                }

                res.status(204).send();
            });
    });
}

router.post("/shaihulud", createShaihulud);
router.get("/shaihulud", getShaihuluds);
router.get("/shaihulud/:shaihuludId", getShaihulud);
router.put("/shaihulud/:shaihuludId", updateShaihulud);
router.delete("/shaihulud/:shaihuludId", deleteShaihulud);

module.exports = router;
