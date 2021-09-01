const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

app.use(cors());
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/advertisements.js")(app);
require("./routes/informations.js")(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
app.listen(9000, () => {
  console.log("Server is running on port 9000.");
});