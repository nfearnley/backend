"use strict";

const Promise = require("bluebird");
const createError = require("http-errors");
const expressPromiseRouter = require("express-promise-router");

const Sarlacc = require("../models/sarlacc");

const router = expressPromiseRouter();

function createSarlacc(req, res) {
    return Promise.try(function() {
        var sarlaccBody = req.body;

        return Sarlacc.create(sarlaccBody)
            .then(function(savedSarlacc) {
                res.status(200).send(savedSarlacc);
            });
    });
}

function getSarlaccs(req, res) {
    return Promise.try(function() {
        return Sarlacc.find()
            .exec()
            .then(function(sarlaccs) {
                res.status(200).send(sarlaccs);
            });
    });
}

function getSarlacc(req, res) {
    return Promise.try(function() {
        var sarlaccId = req.params.sarlaccId;

        return Sarlacc.findById(sarlaccId)
            .exec()
            .then(function(sarlacc) {
                if (!sarlacc) {
                    throw createError(404, "sarlacc not found");
                }

                res.status(200).send(sarlacc);
            });
    });
}

function updateSarlacc(req, res) {
    return Promise.try(function() {
        var sarlaccId = req.params.sarlaccId;
        var sarlaccChanges = req.body;

        return Sarlacc.findByIdAndUpdate(sarlaccId, sarlaccChanges)
            .setOptions({ new: true })
            .exec()
            .then(function(sarlacc) {
                if (!sarlacc) {
                    throw createError(404, "sarlacc not found");
                }

                res.status(200).send(sarlacc);
            });
    });
}

function deleteSarlacc(req, res) {
    return Promise.try(function() {
        var sarlaccId = req.params.sarlaccId;

        return Sarlacc.findByIdAndDelete(sarlaccId)
            .exec()
            .then(function(sarlacc) {
                if (!sarlacc) {
                    throw createError(404, "sarlacc not found");
                }

                res.status(204).send();
            });
    });
}

function feedSarlacc(req, res) {
    return Promise.try(function() {
        var sarlaccId = req.params.sarlaccId;
        var snackBody = req.body;

        return Sarlacc.findById(sarlaccId)
            .exec()
            .then(function(sarlacc) {
                if (!sarlacc) {
                    throw createError(404, "sarlacc not found");
                }

                sarlacc.snacks.push(snackBody);
                return sarlacc.save();
            })
            .then(function(savedSarlacc) {
                res.status(200).send(savedSarlacc);
            });
    });
}

router.post("/sarlacc", createSarlacc);
router.get("/sarlacc", getSarlaccs);
router.get("/sarlacc/:sarlaccId", getSarlacc);
router.put("/sarlacc/:sarlaccId", updateSarlacc);
router.delete("/sarlacc/:sarlaccId", deleteSarlacc);
router.post("/sarlacc/:sarlaccId/feed", feedSarlacc);

module.exports = router;
