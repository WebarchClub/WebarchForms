const { Router } = require("express");
const generateController = require("../controllers/generateController");
const { checkUser } = require("../middleware/authMiddleware");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const Form = require("../models/form");
const User = require("../models/user");
const path = require("path");
const router = Router();
const multer = require("multer");

require("dotenv").config();

const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
const Storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});

// const Storage = multer.diskStorage({
//   destination: "./public/uploads/",
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

var upload = multer({
  storage: Storage,
});

var uploadMultiple = upload.fields([{ name: "formData", maxCount: 20 }]);

router.get("/generation/:email", checkUser, generateController.generate_get);
router.post(
  "/generation/:email",
  uploadMultiple,
  generateController.generate_post
);
router.post("/dataUpload/:email", generateController.dataUpload_post);
// checkUser,
router.get("/image/:filename", generateController.getImg);
module.exports = router;
