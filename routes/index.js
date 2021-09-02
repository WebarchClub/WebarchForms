const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

const authRoutes = require("./authRoutes");
const createForm = require("./createForm");
const formGeneration = require("./formGeneration.js");
router.use(authRoutes);
router.use(createForm);
router.use(formGeneration);
module.exports = router;