const { Router } = require("express");
const viewController = require("../controllers/viewController");
const { checkUser } = require("../middleware/authMiddleware");
const mongoose = require("mongoose");
const Form = require("../models/form");
const path = require("path");
const router = Router();

require("dotenv").config();

router.get("/view/:id", checkUser, viewController.view_get);
router.get("/videoTest/:id", (req, res) => {
  res.render("videoTest", {
    id: req.params.id,
  });
});
module.exports = router;
