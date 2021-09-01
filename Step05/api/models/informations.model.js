const sql = require("../config/db.js");
// constructor
const Information = function(information) {
  this.texte = information.texte;
  this.name  = information.name;
  this.email = information.email;
  this.telephone = information.telephone;
};

Information.create = (newInformation, result) => {
    console.log(newInformation);
    sql.query("INSERT INTO informations SET ?", newInformation, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created information: ", { id: res.insertId, ...newInformation });
      result(null, { id: res.insertId, ...newInformation });
    });
  };

  module.exports = Information;