const { db, query } = require("../database/db");
const { schema } = require("../validatior/validating");
const { returnCapital } = require("../method/toCapital");
const { validErr } = require("../validatior/errValidator");

const addContact = async (req, res) => {
  try {
    const { value, error } = schema.validate(req.body);
    if (validErr(error)) {
      return res.send(error.details[0].message);
    }
    const { number, name } = value;
    const firstLetter = await returnCapital(name);
    await query(
      `INSERT INTO phonebook (pid,ContactName,ContactNumber ) VALUES(null,?,?)`,
      [firstLetter, number],
      (err, result) => {
        if (err) throw Error(err);
        res.status(201).send("new contact created");
      }
    );
  } catch (error) {
    res.status(404).send("not found");
  }
};

const getallContact = async (req, res) => {
  try {
    const contact = `SELECT * FROM phonebook`;
    await query(contact, (err, result) => {
      if (err) throw Error(err);
      res.status(200).send(result);
    });
  } catch (err) {
    res.status(404).send("not found");
  }
};

const editContact = async (req, res) => {
  try {
    await query(
      `SELECT * FROM phonebook WHERE pid=?`,
      [req.params.pid],
      (err, result) => {
        if (err) throw Error(err);
        res.send(result);
      }
    );
  } catch (error) {
    res.status(404).send("not found");
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
    await query(
      `UPDATE phonebook SET ContactName =?,ContactNumber=? WHERE pid=?`,
      [firstLetter, number, pid],
      (err, result) => {
        if (err) throw Error(err);
        res.status(201).send("OK");
      }
    );
  } catch (error) {
    res.status(404).send(error);
  }
};

const deleteContact = async (req, res) => {
  try {
    const responce = await query(`DELETE FROM phonebook WHERE pid=?`, [
      req.params.pid,
    ]);
    if (responce) res.status(201).send("Deleted");
  } catch (error) {
    res.status(404).send("not found");
  }
};

module.exports = {
  deleteContact,
  editOneContact,
  editContact,
  getallContact,
  addContact,
};
