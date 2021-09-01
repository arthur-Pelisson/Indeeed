module.exports = app => {
  var jwt = require('jsonwebtoken');

  const users = require("../controllers/user.controller.js");

  // Create a new user
  app.post("/register", users.create);

  app.post("/login", users.authenticate)
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

  app.get("/profile",validateUser, users.findOne);

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