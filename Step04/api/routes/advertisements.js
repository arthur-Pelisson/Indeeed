module.exports = app => {
    const advertisements = require("../controllers/advertisement.controller.js");
  
    // Create a new advertisement
    app.post("/advertisements", advertisements.create);
  
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
  };