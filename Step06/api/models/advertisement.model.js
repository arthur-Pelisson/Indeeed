const sql = require("../config/db.js");
// constructor
const Advertisement = function(advertisement) {
  this.titre = advertisement.titre;
  this.texte = advertisement.texte;
  this.salaire = advertisement.salaire;
  this.lieu = advertisement.lieu;
  this.temps_de_travail = advertisement.temps_de_travail;
  this.resume = advertisement.resume;
};

Advertisement.create = (newAdvertisement, result) => {
  sql.query("INSERT INTO advertisements SET ?", newAdvertisement, (err, res) => {
    console.log("2")
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created advertisement: ", { id: res.insertId, ...newAdvertisement });
    result(null, { id: res.insertId, ...newAdvertisement });
  });
};

Advertisement.findById = (advertisementId, result) => {
  sql.query(`SELECT * FROM advertisements WHERE id = ${advertisementId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found advertisment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Advertisement with the id
    result({ kind: "not_found" }, null);
  });
};

Advertisement.getAll = result => {
  sql.query("SELECT * FROM advertisements", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("advertisements: ", res);
    result(null, res);
  });
};

Advertisement.updateById = (id, advertisement, result) => {
  sql.query(
    "UPDATE advertisements SET titre = ?, text = ?, salaire = ?, lieu= ?, temps_de_travail = ?, resume = ? WHERE id = ?",
    [advertisement.titre, advertisement.text, advertisement.salaire, advertisement.lieu, advertisement.temps_de_travail, advertisement.resume, id],
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

      console.log("updated advertisement: ", { id: id, ...advertisement });
      result(null, { id: id, ...advertisement });
    }
  );
};

Advertisement.remove = (id, result) => {
  sql.query("DELETE FROM advrtisement WHERE id = ?", id, (err, res) => {
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

    console.log("deleted adertisement with id: ", id);
    result(null, res);
  });
};

Advertisement.removeAll = result => {
  sql.query("DELETE FROM advertisements", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} advertisements`);
    result(null, res);
  });
};

module.exports = Advertisement;
