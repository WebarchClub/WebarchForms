const mongoose = require("mongoose");
const Form = require("../models/form");
const User = require("../models/user");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

module.exports.createForm = async (req, res) => {
  try {
    const user = User.findOne({ email: req.params.email });
    if (user) {
      const forms = await Form.find({ email: req.params.email });
      res.render("dashBoard", {
        email: req.params.email,
        forms: forms,
      });
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err.message);
  }
};
