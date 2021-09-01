
const sql = require("../config/db.js");

const Role = function(role) {
    this.nom = role.nom
};

Role.findById = (userId, result) => {
    sql.query(`SELECT roles.nom as nomRoles FROM peoples INNER JOIN roles WHERE peoples.id = ${userId} AND peoples.fk_role_id = roles.id`, (err, res) => {
        console.log('roooooooooooooooooooooooooooooooooooooooooooooooooooool');
        console.log(res);
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found role of: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };

  module.exports = Role;