const sql = require("../config/db.js");
// constructor
const Information = function(information) {
  this.texte = information.texte;
  this.fk_advertisement_id = information.fk_advertisement_id
  this.fk_people_id = information.fk_people_id
  this.nom  = information.nom;
  this.prenom  = information.prenom;
  this.email = information.email;
  this.telephone = information.telephone;
};

Information.create = (newInformation, result) => {
  // console.log(newInformation);
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

Information.findById = (informationId, result) => {
  sql.query(`SELECT peoples.* , roles.nom as nomRoles FROM peoples INNER JOIN roles WHERE peoples.id = ${informationId} AND peoples.fk_role_id = roles.id`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found informations: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Information.getAll = result => {
  sql.query("SELECT * FROM informations", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    
    console.log("user: ", res);
    result(null, res);
  });
};

Information.updateById = (id, information, result) => {
  console.log(id);
  sql.query(
    "UPDATE informations SET texte = (?), fk_people_id = (?), fk_advertisement_id = (?), nom = (?), prenom = (?), email = (?), telephone = (?) WHERE id = (?)",
    [information.texte, information.fk_people_id, information.fk_advertisement_id, information.nom, information.prenom, information.email, information.telephone, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not infomations not found with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated informations: ", { id: id, ...information });
      result(null, { id: id, ...information });
    }
  );
};

Information.remove = (id, result) => {
  sql.query(`DELETE FROM informations WHERE id = ${id}` , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Informations with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted information with id: ", id);
    result(null, res);
  });
};



module.exports = Information;