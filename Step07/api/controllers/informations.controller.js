const Information = require('../models/informations.model.js');
const email = require('./nodemailer.controller')
//create new information

exports.create = (req, res) => {
    // Validate request
    // console.log(req.body);
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    
    // console.log(req.params.userId);
    // console.log("hooooooooooooooooooooooooooooooo")
    // Create a Information
    const information = new Information({
        texte: req.body.texte,
        fk_advertisement_id : req.body.fk_advertisement_id,
        fk_people_id : req.params.userId,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        telephone: req.body.telephone,
    });
    
    // Save Information in the database
    Information.create(information, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Information."
        });
        else {
            email.mail(data);
            res.send(data);
        } 
    });
};




exports.findAll = (req, res) => {
    Information.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving User."
        });
        else res.send(data);
    });
};


exports.findOne = (req, res) => {
    Information.findById(req.params.informationId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found informations with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Informations with id " + req.params.informationId
                });
            }
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    // Validate Request
    // console.log(req.params.userId);
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Information.updateById(
        req.params.informationsId,
        new Information(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found information with id ${req.params.informationId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating information with id " + req.params.informationId
                    });
                }
            } else res.send(data);
        }
        );
    };

    exports.delete = (req, res) => {
        Information.remove(req.params.informationsId, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found information with id ${req.params.informationsId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not delete information with id " + req.params.informationsId
                    });
                }
            } else res.send({ message: `Information was deleted successfully!` });
        });
    };
    
    
    