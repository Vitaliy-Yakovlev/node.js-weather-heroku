const express = require("express");
const router = express.Router();

router
  .get("/contacts", (req, res) => {
    res.json({ contacts: [] });
  })
  .post("/contacts", (req, res) => {
    res.json({ contacts: [Vitaliy] });
  });

module.exports = {
  router,
};
