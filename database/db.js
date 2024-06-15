const mysql = require("mysql2");
const util = require("util");

const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize("phonebook", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});
const query = util.promisify(sequelize.query).bind(sequelize);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize;
