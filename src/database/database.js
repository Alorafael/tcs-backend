const mysql = require("mysql");

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"database",
    password:""
});

const request = (sql) => {
    con.query(sql, function (err, result) {
            if (err) {
                return err;
            } else {
                console.log(result)
                return result;
            }
        });
    };

module.exports = {request, con};