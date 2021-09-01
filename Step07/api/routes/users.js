module.exports = app => {
  var jwt = require('jsonwebtoken');
  
  const users = require("../controllers/user.controller.js");
  const roles = require("../controllers/roles.controller.js");
  
  // Create a new user
  app.post("/register", users.create);
  //login in users
  app.post("/login", users.authenticate);
  // Retrieve all users
  app.get("/users", users.findAll);
  
  // Retrieve a single user with userId
  app.get("/users/:userId", users.findOne);
  
  // Update a user with userId
  app.put("/users/:userId", users.update);
  
  // Delete a user with userId
  app.delete("/users/:userId", users.delete);
  
  // Create a new user
  app.delete("/users", users.deleteAll);
  
  
  
  app.put("/profile" , validateUser, users.update);
  
  app.get("/profile",validateUser, roles.roleName, users.findProfile, );

  app.get("/profile/admin/user/:userId", validateAdmin, roles.roleName, users.adminFindProfile)
  
  
  function validateUser(req, res, next) {
    console.log(req.params);
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

  function validateAdmin(req, res, next) {
    console.log(req.params);
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      } else {
        // add user id to request
        req.params.profileUser = req.params.userId;
        req.params.userId = decoded.id;
        console.log(req.params);
        next();
      }
    });
  }
};