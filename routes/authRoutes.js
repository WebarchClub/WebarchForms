const { Router } = require("express");
const authController = require("../controllers/authControllers.js");
const router = Router();

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

router.get("/forgot", authController.forgot_get);
router.post("/forgot", authController.forgot_post);

router.get("/reset/:pass", authController.reset_get);
router.post("/reset/:pass", authController.reset_post);

router.get("/logout", authController.logout);

router.get("/check", (req, res) => {
  res.render("check");
});
module.exports = router;
