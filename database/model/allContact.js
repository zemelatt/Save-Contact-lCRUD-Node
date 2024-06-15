const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const phonebook = sequelize.define("phonebook", {
  pid: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ContactName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ContactNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
sequelize
  .sync()
  .then(() => {
    console.log("contact table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
module.exports = phonebook;
