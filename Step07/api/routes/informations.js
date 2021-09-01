module.exports = app => {
    const informations = require("../controllers/informations.controller.js");
    var jwt = require('jsonwebtoken');

  
    // Create a new advertisement
    app.post("/informations",ifTokenExiste, informations.create);
    
    app.get("/informations/:informationsId", informations.findOne);
    
    //get all infomation
    app.get("/informations", informations.findAll);
    
  // Update a informtion with informationsId
    app.put("/informations/:informationsId", informations.update);
  
  // Delete a informtion with informationsId
    app.delete("/informations/:informationsId", informations.delete);
  
  // Create a new informtion
  // app.delete("/informations", informations.deleteAll);
  
    //if token existe get id from token
    function ifTokenExiste(req, res, next) {
      // console.log(typeof req.headers['x-access-token']);
      if (typeof req.headers['x-access-token'] != 'undefined' ) {
        jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
          if (err) {
            res.json({status:"error", message: err.message, data:null});
          } else {
            // add user id to request
            // console.log(decoded.id);
            req.params.userId = decoded.id;
            next();
          }
        });
      } else {
        next();
      }
      
    }
  };