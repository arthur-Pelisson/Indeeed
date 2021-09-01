const Advertisement = require("../models/advertisement.model.js");

// Create and Save a new Advertisement

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Customer
    const advertisement = new Advertisement({
        titre:  req.body.titre,
        texte:  req.body.texte,
        salaire:  req.body.salaire,
        lieu:  req.body.lieu,
        temps_de_travail:  req.body.temps_de_travail,
        resume:  req.body.resume,
    });
    
    // Save Customer in the database
    Advertisement.create(advertisement, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Advertisement."
        });
        else res.send(data);
    });
};

// Retrieve all Advertisements from the database.
exports.findAll = (req, res) => {
    Advertisement.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving advertisement."
        });
        else res.send(data);
    });
};

// Find a single Advertisement with a AdvertisementId
exports.findOne = (req, res) => {
    Advertisement.findById(req.params.advertisementId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found advertisement with id ${req.params.advertisementId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving advertisement with id " + req.params.advertisementId
                });
            }
        } else res.send(data);
    });
};

// Update a Advertisement identified by the AdvertisementId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    
    Advertisement.updateById(
        req.params.advertisementId,
        new Advertisement(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Advertisement with id ${req.params.advertisementId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Advertisement with id " + req.params.advertisementId
                    });
                }
            } else res.send(data);
        }
    );
};
    
// Delete a Advertisement with the specified AdvertisementId in the request
exports.delete = (req, res) => {
    Advertisement.remove(req.params.advertisementId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found advertisement with id ${req.params.advertisementId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete advertisement with id " + req.params.advertisementId
                });
            }
        } else res.send({ message: `Advertisement was deleted successfully!` });
    });
};
    
// Delete all Advertisements from the database.
exports.deleteAll = (req, res) => {
    Advertisement.removeAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all advertisement."
        });
        else res.send({ message: `All Advertisement were deleted successfully!` });
    });
};