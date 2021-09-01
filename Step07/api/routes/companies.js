module.exports = app => {
    const companies = require("../controllers/companie.controller.js");
  
    // Create a new companie
    app.post("/companies", companies.create);
  
    // Retrieve all companies
    app.get("/companies", companies.findAll);
  
    // Retrieve a single companie with companieId
    app.get("/companies/:companieId", companies.findOne);
  
    // Update a companie with companieId
    app.put("/companies/:companieId", companies.update);
  
    // Delete a companie with companieId
    app.delete("/companies/:companieId", companies.delete);
  
    // Create a new companie
    app.delete("/companies", companies.deleteAll);


    // app.get("/user/advertisements", validateUser, advertisements.findAll);

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