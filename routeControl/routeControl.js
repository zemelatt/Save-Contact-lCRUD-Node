const sequelize = require("../database/db");
const { schema } = require("../utilits/validatior/validating");
const { returnCapital } = require("../utilits/toCapital");
const { validErr } = require("../utilits/validatior/errValidator");
const phonebook = require("../database/model/allContact");
const addContact = async (req, res) => {
  try {
    const { value, error } = schema.validate(req.body);
    if (validErr(error)) {
      return res.send(error.details[0].message);
    }
    const { number, name } = value;
    const firstLetter = await returnCapital(name);
    await sequelize.sync();
    const output = phonebook.create({
      ContactName: firstLetter,
      ContactNumber: number,
    });
    if (output) {
      res.status(201).send("new contact created");
      return;
    }
    console.error("Unable to create table : ", error);
  } catch (error) {
    res.status(404).send("not found");
  }
};

const getallContact = async (req, res) => {
  try {
    await sequelize.sync();
    const result = await phonebook.findAll();
    res.status(200).send(result);
  } catch (error) {
    if (error.name === "SequelizeConnectionError") {
      res.status(500).send("Internal server error");
    } else {
      res.status(500).send("Failed to retrieve data");
    }
  }
};

const editContact = async (req, res) => {
  console.log(req.params.pid);
  try {
    await sequelize.sync();
    const result = await phonebook.findOne({
      where: {
        id: req.params.pid,
      },
    });
    res.send(result);
  } catch (error) {
    if (error.name === "SequelizeConnectionError") {
      res.status(500).send("Internal server error");
    } else {
      res.status(500).send("Failed to retrieve data");
    }
  }
};
const editOneContact = async (req, res) => {
  try {
    const { value, error } = schema.validate(req.body);
    if (validErr(error)) {
      return res.send(error.details[0].message);
    }
    const { number, name, pid } = value;

    const firstLetter = await returnCapital(name);

    await sequelize.sync();
    const output = await phonebook.findOne({
      where: {
        id: pid,
      },
    });
    if (output) {
      output.update({
        ContactName: firstLetter,
        ContactNumber: number,
      });
      res.status(201).send("OK");
      return;
    }
    res.status(404).send("Entry not found");
  } catch (error) {
    if (error.name === "SequelizeConnectionError") {
      res.status(500).send("Internal server error");
    } else {
      res.status(500).send("Failed to retrieve data");
    }
  }
};

const deleteContact = async (req, res) => {
  const { pid } = req.params;
  try {
    await sequelize.sync();

    await phonebook.destroy({
      where: {
        id: pid,
      },
    });
    res.status(201).send("Deleted");
  } catch (error) {
    if (error.name == "SequelizeDatabaseError") {
      console.error("Unable to create table:", error);
    } else {
      console.error("Failed to delete record:", error);
    }
  }
};

module.exports = {
  deleteContact,
  editOneContact,
  editContact,
  getallContact,
  addContact,
};
