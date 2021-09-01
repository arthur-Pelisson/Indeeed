module.exports = app => {
  var jwt = require('jsonwebtoken');
  const advertisements = require("../controllers/advertisement.controller.js");
  
  // Create a new advertisement
  app.post("/advertisements", validateUser, advertisements.create);
  
  // Retrieve all advertisements
  app.get("/advertisements", advertisements.findAll);
  
  // Retrieve a single advertisement with advertisementId
  app.get("/advertisements/:advertisementId", advertisements.findOne);
  
  // Update a advertisement with advertisementId
  app.put("/advertisements/:advertisementId", advertisements.update);
  
  // Delete a advertisement with advertisementId
  app.delete("/advertisements/:advertisementId", advertisements.delete);
  
  // Create a new advertisement
  app.delete("/advertisements", advertisements.deleteAll);
  
  
  app.get("/user/advertisements", validateUser, advertisements.findAll);
  
  function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      } else {
        // add user id to request
        req.params.userId = decoded.id;
        next();
      }
    });
    
  }
  
};