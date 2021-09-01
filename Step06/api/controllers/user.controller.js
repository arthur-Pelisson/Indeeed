const User = require("../models/user.model.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Create and Save a new User

exports.create = (req, res) => {
    // Validate request
    // console.log(req.body);
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    
    const hash = bcrypt.hashSync(req.body.password, 10)
    
    // Create a Customer
    const user = new User({
        email:  req.body.email,
        password:  hash,
        telephone:  req.body.telephone,
        nom:  req.body.nom,
        prenom:  req.body.prenom,
    });
    
    User.findOne(user.email, function(err, users) {
        //if user found.
        if (users) {
            if(user.email) {
                console.log('EMAIL already exists, email: ' + user.email);
                res.send({
                    message: 'EMAIL already exists, email: ' + user.email
                }); 
                
            }   else {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the User."
                });
            }
        } else {
            User.create(user, (err, data) => {
                if (err)
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the User."
                });
                else res.send(data);
            });
        }
    });
    
    
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving User."
        });
        else res.send(data);
    });
};

// Find a single User with a UserId
exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

// Update a User identified by the UserId in the request
exports.update = (req, res) => {
    // Validate Request
    console.log(req.params.userId);
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    console.log(req.body.password);
    console.log(req.body.email);
    User.findOne(user.email, function(err, user) {
        console.log(user);
        if (err) {
            return res.send(err)
        }
        if (user || user != null) {
            res.send('Email elready existe');
        } else {
            User.updateById(
                req.params.userId,
                new User(req.body),
                (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            res.status(404).send({
                                message: `Not found user with id ${req.params.userId}.`
                            });
                        } else {
                            res.status(500).send({
                                message: "Error updating User with id " + req.params.userId
                            });
                        }
                    } else res.send(data);
                }
                );
            }
        });
    };
    
    // Delete a User with the specified UserId in the request
    exports.delete = (req, res) => {
        User.remove(req.params.userId, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found user with id ${req.params.userId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not delete user with id " + req.params.userId
                    });
                }
            } else res.send({ message: `User was deleted successfully!` });
        });
    };
    
    // Delete all Users from the database.
    exports.deleteAll = (req, res) => {
        User.removeAll((err, data) => {
            if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while removing all user."
            });
            else res.send({ message: `All User were deleted successfully!` });
        });
    };
    
    
    exports.authenticate = (req, res) => {
        User.findOne(req.body.email, function(err, userInfo){
            
            if (err) {
                console.log(err);
                res.json({status:"error", message: "Invalid email/password!!!", data:null});
            } else {
                if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({id: userInfo.id}, req.app.get('secretKey'), { expiresIn: '6h' });
                    res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
                }   else {
                    res.json({status:"error", message: "Invalid email/password!!!", data:null});
                }
            }
        });
    }