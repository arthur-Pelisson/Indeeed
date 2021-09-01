const Information = require('../models/informations.model.js');
const email = require('./nodemailer.controller')
//create new information

exports.create = (req, res) => {
    // Validate request
    console.log(req.body);
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Customer
    const information = new Information({
        texte: req.body.texte,
        name: req.body.name,
        email: req.body.email,
        telephone: req.body.telephone,
    });
    
    // Save Customer in the database
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