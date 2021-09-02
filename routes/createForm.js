const { Router } = require("express");
const createFormController = require("../controllers/createFormController");
const { checkUser } = require("../middleware/authMiddleware");
const router = Router();

router.get("/createForm/:id", checkUser, createFormController.createForm);

module.exports = router;
