const Companie = require("../models/companie.model.js");
const Advertisement = require("../models/companie.model.js");

// Create and Save a new Advertisement

exports.create = (req, res) => {
    // Validate request
    console.log(req.body);
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Customer
    const companie = new Companie({
        nom:  req.body.nom,
        fk_people_id:  req.body.fk_people_id
    });
    
    // Save Customer in the database
    Companie.create(companie, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Companie."
        });
        else res.send(data);
    });
};

// Retrieve all Companies from the database.
exports.findAll = (req, res) => {
    Companie.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving companie."
        });
        else res.send(data);
    });
};

// Find a single Companie with a CompanieId
exports.findOne = (req, res) => {
    Companie.findById(req.params.companieId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found companie with id ${req.params.companieId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving companie with id " + req.params.companieId
                });
            }
        } else res.send(data);
    });
};

// Update a Companie identified by the CompanieId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    
    Companie.updateById(
        req.params.companieId,
        new Companie(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Companie with id ${req.params.companieId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Companie with id " + req.params.companieId
                    });
                }
            } else res.send(data);
        }
    );
};
    
// Delete a Companie with the specified CompanieId in the request
exports.delete = (req, res) => {
    Companie.remove(req.params.companieId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found companie with id ${req.params.companieId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete advertisement with id " + req.params.companieId
                });
            }
        } else res.send({ message: `Companie was deleted successfully!` });
    });
};
    
// Delete all Companie from the database.
exports.deleteAll = (req, res) => {
    Companie.removeAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all companie."
        });
        else res.send({ message: `All Companie were deleted successfully!` });
    });
};