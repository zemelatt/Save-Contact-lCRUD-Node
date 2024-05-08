const { db, query } = require("../database/db");
const { schema } = require("../validatior/validating");

module.exports.addContact = async (req, res) => {
  try {
    const { value, error } = schema.validate(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }
    const { number, name } = value;

    const firstLetter = name.charAt(0).toUpperCase() + name.slice(1);

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

module.exports.getallContact = async (req, res) => {
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

module.exports.editContact = async (req, res) => {
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

module.exports.editOneContact = async (req, res) => {
  try {
    const { value, error } = schema.validate(req.body);
    if (error) {
      return res.send(error.details[0].message);
    }
    const firstLetter =
      value.name.charAt(0).toUpperCase() + value.name.slice(1);
    await query(
      `UPDATE phonebook SET ContactName =?,ContactNumber=? WHERE pid=?`,
      [firstLetter, value.number, value.pid],
      (err, result) => {
        if (err) throw Error(err);
        res.status(201).send("OK");
      }
    );
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports.deleteContact = async (req, res) => {
  try {
    await query(`DELETE FROM phonebook WHERE pid=?`, [req.params.pid]);
  } catch (error) {
    res.status(404).send("not found");
  }
};
