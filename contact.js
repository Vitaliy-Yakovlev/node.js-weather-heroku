const express = require("express");
const router = express.Router();

router
  .get("/contacts", (req, res) => {
    res.json({ contacts: ["name: Julia", "tel:+38066*****28"] });
  })
  .post("/contacts", (req, res) => {
    res.json({ contacts: ["name: Vitaliy", "tel:+38050*****60"] });
  });

module.exports = {
  router,
};
