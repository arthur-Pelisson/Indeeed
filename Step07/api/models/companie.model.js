const sql = require("../config/db.js");
// constructor
const Companie = function(companie) {
  this.nom = companie.nom;
  this.fk_people_id = companie.fk_people_id;
  
};

Companie.create = (newCompanie, result) => {
  sql.query("INSERT INTO companies SET ?", newCompanie, (err, res) => {
    console.log("2")
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created companie: ", { id: res.insertId, ...newCompanie });
    result(null, { id: res.insertId, ...newCompanie });
  });
};

Companie.findById = (CompanieId, result) => {
  sql.query(`SELECT * FROM companies WHERE id = ${companieId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found companie: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Companie with the id
    result({ kind: "not_found" }, null);
  });
};

Companie.getAll = result => {
  sql.query("SELECT * FROM companies", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("companie: ", res);
    result(null, res);
  });
};

Companie.updateById = (id, companie, result) => {
  sql.query(
    "UPDATE companies SET nom = ?, fk_people_id = ? WHERE id = ?",
    [companie.nom, companie.fk_people_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Advertisement with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated advertisement: ", { id: id, ...companie });
      result(null, { id: id, ...companie });
    }
  );
};

Companie.remove = (id, result) => {
  sql.query("DELETE FROM companies WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found ompagnie with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted companie with id: ", id);
    result(null, res);
  });
};

Companie.removeAll = result => {
  sql.query("DELETE FROM companies", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} companies`);
    result(null, res);
  });
};

module.exports = Companie;
