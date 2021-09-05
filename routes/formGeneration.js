const { Router } = require("express");
const generateController = require("../controllers/generateController");
const { checkUser } = require("../middleware/authMiddleware");
const router = Router();
const multer = require("multer");
const Storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

var upload = multer({
  storage: Storage,
}).array("file", 12);

router.get("/generation/:id", generateController.generate_get);
router.post("/generation/:id", upload, generateController.generate_post);
// checkUser,

module.exports = router;
