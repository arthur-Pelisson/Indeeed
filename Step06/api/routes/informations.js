module.exports = app => {
    const informations = require("../controllers/informations.controller.js");
  
    // Create a new advertisement
    app.post("/informations", informations.create);
  };