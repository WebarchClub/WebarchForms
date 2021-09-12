const { Router } = require("express");
const viewController = require("../controllers/viewController");
const { checkUser } = require("../middleware/authMiddleware");
const mongoose = require("mongoose");
const Form = require("../models/form");
const path = require("path");
const router = Router();

require("dotenv").config();

router.get("/view/:id", checkUser, viewController.view_get);

module.exports = router;
