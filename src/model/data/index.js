const sqlite3 = require("sqlite3").verbose();
const path = require("path");

module.exports = function () {
  const filename = path.join(__dirname, "db", "hhs.db");
  return {
    getNurses: function (options) {
      return new Promise((resolve, reject) => {
        // open the database
        let db = new sqlite3.Database(filename);

        let sql = `SELECT * FROM NURSES
                WHERE 1 = 1`;

        if (options.name) {
          sql += ` AND (instr(LOWER(first_name), LOWER($name)) > 0 OR instr(LOWER(last_name), LOWER($name)) > 0)`;
        }

        if (options.ward) {
          const wardOptions = options.ward.split(",");
          const parameterizedWardOptions = wardOptions.join("' OR ward LIKE '");
          sql += ` AND (ward LIKE '${parameterizedWardOptions}')`;
        }

        //console.log(sql);

        let params = {
          $name: options.name,
        };

        db.all(sql, params, (err, rows) => {
          if (err) {
            reject(err);
          }
          //console.log(rows.length);
          const page = options.page ? options.page : 0;
          const results = rows.slice(
            page * 10,
            page * 10 + 10 > rows.length ? rows.length : page * 10 + 10
          );
          resolve({
            nurses: results,
            noOfPages: Math.ceil(rows.length / 10),
          });
        });

        // close the database connection
        db.close();
      });
    },

    getNurseById: function (id) {
      return new Promise((resolve, reject) => {
        // open the database
        let db = new sqlite3.Database(filename);

        let params = [];

        let sql = `SELECT * FROM NURSES
                WHERE id = ?`;

        params.push(id);

        db.get(sql, params, (err, row) => {
          if (err) {
            reject(err);
          }
          resolve(row);
        });

        // close the database connection
        db.close();
      });
    },

    addNurse: function (newNurse) {
      return new Promise((resolve, reject) => {
        // open the database
        let db = new sqlite3.Database(filename);
        let sql = `INSERT INTO NURSES (id, first_name, last_name, email, ward) VALUES ($id, $first_name, $last_name, $email, $ward)`;
        db.run(
          sql,
          {
            $id: newNurse.id,
            $first_name: newNurse.first_name,
            $last_name: newNurse.last_name,
            $email: newNurse.email,
            $ward: newNurse.ward,
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(newNurse.id);
            }
          }
        );

        // close the database connection
        db.close();
      });
    },

    updateNurse: function (updatedNurse) {
      return new Promise((resolve, reject) => {
        // open the database
        let db = new sqlite3.Database(filename);
        const id = updatedNurse.id;

        Object.entries(updatedNurse).forEach(([key, value]) => {
          let sql = `UPDATE NURSES SET ${key} = $value
                WHERE id = $id`;
          db.run(sql, { $id: id, $value: value }, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(updatedNurse);
            }
          });
        });

        // close the database connection
        db.close();
      });
    },

    deleteNurse: function (id) {
      return new Promise((resolve, reject) => {
        // open the database
        let db = new sqlite3.Database(filename);

        let sql = `DELETE FROM NURSES
                WHERE id = $id`;

        db.run(sql, { $id: id }, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(id);
          }
        });

        // close the database connection
        db.close();
      });
    },
  };
};
