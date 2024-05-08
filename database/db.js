const mysql = require("mysql2");
const util = require("util");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "phonebook",
});

const query = util.promisify(db.query).bind(db);

module.exports = { query, db };
