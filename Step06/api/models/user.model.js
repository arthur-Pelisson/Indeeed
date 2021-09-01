const sql = require("../config/db.js");

// constructor
const User = function(user) {
  this.email = user.email;
  this.password = user.password;
  this.telephone = user.telephone;
  this.nom = user.nom;
  this.prenom = user.prenom;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO peoples SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM peoples WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found peoples: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM peoples", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  // console.log(user);
  sql.query(
    "UPDATE peoples SET email = (?), password = (?), telephone = (?), nom= (?), prenom = (?) WHERE id = (?)",
    [user.email, user.password, user.telephone, user.nom, user.prenom, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM peoples WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM peoples", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} peoples`);
    result(null, res);
  });
};


User.findOne = (filter, result) => {
  console.log(filter)
  sql.query("SELECT * FROM peoples WHERE email = ?",
  [filter],
  (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(null, res[0]);
      return;
    }
    
    if (res.length) {
      // console.log("found: ", res[0]);
      result(null, res[0]);
      return;
    }
    
    // not found User with the filter
    result({ kind: "not_found" }, null);
  });
}


module.exports = User;
