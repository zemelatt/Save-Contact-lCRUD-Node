const express = require("express");
const router = express.Router();
const {
  addContact,
  getallContact,
  editContact,
  editOneContact,
  deleteContact,
} = require("../routeControl/routeControl");

router.post("/phonebook", addContact);
router.get("/phonebook", getallContact);
router.get("/phonebook/:pid", editContact);
router.put("/phonebook/up/:update", editOneContact);
router.delete("/phonebook/delete/:pid", deleteContact);

module.exports = router;
