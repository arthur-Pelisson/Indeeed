const Role = require("../models/roles.model.js");
const User = require("../models/user.model.js");


exports.roleName = async (req, res, next) => {
    console.log('toto');
    console.log(req.body);
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
        } else {
            if (data.nomRoles === 'undefined') {
                res.send(err);
        } else if (data.nomRoles === 'Administrateur') {
                req.params = {
                    ownProfile: data,
                    findProfile: req.params.profileUser,    
                }
                console.log('if admin');
                console.log(req.params)
                // console.log(data);
                next();
            } else {
                req.params = data;
                console.log('daaaaaaaaataaaaaaaaaaaaa');
                console.log(data);
                next();
            }
        }
    });
    // if (req.params.nomRoles === 'Utilisateur') {
    //     // console.log(req.params);
    //     User.getAdvertisement(req.params.id, (err, data) => {
    //         if (err) {
    //             if (err.kind === "not_found") {
    //                 res.status(404).send({
    //                     message: `Not found user with id ${req.params.userId}.`
    //                 });
    //             } else {
    //                 res.status(500).send({
    //                     message: "Error retrieving User with id " + req.params.userId
    //                 });
    //             }
    //         } else {
    //             if (data.nomRole === 'undefined') {
    //                 res.send(data);
    //             } else {
    //                 // console.log(data);
    //                 res.send(data);
    //             }
    //         }
    //     });
    // } else if (req.params.nomRoles === 'Entreprise') {
        
    // } else if (req.params.nomRoles === 'Administrateur') {
    //     User.getAllInformation(req.params.id, (err, data) => {
    //         if (err) {
    //             if (err.kind === "not_found") {
    //                 res.status(404).send({
    //                     message: `Not found user with id ${req.params.userId}.`
    //                 });
    //             } else {
    //                 res.status(500).send({
    //                     message: "Error retrieving User with id " + req.params.userId
    //                 });
    //             }
    //         } else {
    //             if (data.nomRole === 'undefined') {
    //                 res.send(data);
    //             } else {
    //                 console.log('biiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiib');
    //                 console.log(data);
    //                 res.send(data);
    //             }
    //         }
    //     });
    // }
    // next();
}
