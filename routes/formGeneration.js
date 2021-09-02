const { Router } = require("express");
const generateController = require("../controllers/generateController");
const { checkUser } = require("../middleware/authMiddleware");
const router = Router();

router.get("/generation/:id", generateController.generate_get);
router.post("/generation/:id", generateController.generate_post);
// checkUser,

module.exports = router;
