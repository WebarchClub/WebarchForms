const mongoose = require("mongoose");
const Form = require("../models/form");
const User = require("../models/user");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

module.exports.generate_get = (req, res) => {
  res.render("formGeneration", {
    email: req.params.email,
  });
};
//here id is name
module.exports.generate_post = (req, res) => {
  // console.log(req.files.formData);
  // console.log("this is the forms");
  // console.log(req.body);
  if (req.files.formData.length > 0) {
    return res.json({ message: req.files.formData });
  } else {
    return res.json({ error: "something went wrong" });
  }
};
module.exports.dataUpload_post = async (req, res) => {
  console.log(req.body);
  const email = req.params.email;
  try {
    const { v4: uuidV4 } = require("uuid");
    const uid = uuidV4();
    const dataUser = await User.findOneAndUpdate(
      { email: email },
      {
        $push: { forms: { $each: [uid] } },
      }
    );
    console.log(dataUser);
    const postData = await Form.create({
      email: dataUser[0].email,
      formId: uid,
      url: "http://localhost:5000/response/" + uid,
      arObj: req.body,
    });
    console.log(postData);
    return res.json({ data: postData });
  } catch (e) {
    return res.json({ error: "unable to send the data" });
  }
};
//id is the issue do it email
module.exports.getImg = (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length == 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    if (file.contentType == "image/jpeg" || file.contentType == "image/png") {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
};
