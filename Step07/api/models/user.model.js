const sql = require("../config/db.js");

// constructor
const User = function(user) {
  this.email = user.email;
  this.password = user.password;
  this.telephone = user.telephone;
  this.nom = user.nom;
  this.prenom = user.prenom;
  this.fk_role_id = user.fk_role_id
  
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
  sql.query(`SELECT peoples.* , roles.nom as nomRoles FROM peoples INNER JOIN roles WHERE peoples.id = ${userId} AND peoples.fk_role_id = roles.id`, (err, res) => {
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
  
  
  User.getUtilisateurAdvertisement = (userId, result) => {
    sql.query(`SELECT advertisements.* FROM peoples INNER JOIN informations on informations.fk_people_id = peoples.id INNER JOIN advertisements on advertisements.id = informations.fk_advertisement_id WHERE peoples.id = ${userId} AND informations.fk_people_id = peoples.id`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Function getutilisatur");
      
      if (res.length) {
        console.log("found peoples: ", res);
        result(null, res);
        return;
      } else {
        result();
      }
      
      // not found User with the id
      // result({ kind: "not_found" }, null);
    });
  }
  
  User.getEntrepriseAdvertisement = (userId, result) => {
    console.log('okkooooooooooooooooooo');
    sql.query(`SELECT advertisements.* FROM peoples INNER JOIN companies INNER JOIN advertisements
    WHERE peoples.id = ${userId} AND peoples.id = companies.fk_people_id AND companies.id = advertisements.fk_entreprise_id `,
    (err, res) => {
      console.log();
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      if (res.length) {
        console.log("found peoples: ", res);
        result(null, res);
        return;
      } else {
        result();
      }
      
      
      // not found User with the id
      // result({ kind: "not_found" }, null);
    });
  }
  
  User.getEveryOne = (userId, result) => {
    // console.log('okkooooooooooooooooooo');
    sql.query(`SELECT peoples.*,  advertisements.* FROM peoples INNER JOIN companies INNER JOIN advertisements
    WHERE peoples.id = ${userId} AND peoples.id = companies.fk_people_id AND companies.id = advertisements.fk_entreprise_id `,
    (err, res) => {
      console.log();
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      if (res.length) {
        console.log("found peoples: ", res);
        result(null, res);
        return;
      } else {
        result();
      }
      
      
      // not found User with the id
      // result({ kind: "not_found" }, null);
    });
  }
        User.findCompanie = (userId, result) => {
          // console.log('okkooooooooooooooooooo');
          sql.query(`SELECT companies.id FROM peoples INNER JOIN companies WHERE peoples.id = ${userId} AND companies.fk_people_id = peoples.id  `,
          (err, res) => {
            console.log();
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
            
            if (res.length) {
              console.log("found companie: ", res);
              result(null, res);
              return;
            } else {
              result();
            }
            
            
            // not found User with the id
            // result({ kind: "not_found" }, null);
          });
        }
    
    
    module.exports = User;
    