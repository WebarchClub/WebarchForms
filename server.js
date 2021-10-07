// Requiring dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const router = require("./routes");
const multer = require("multer");

const upload = multer();
// Loading env variables
dotenv.config();

// Initializing the app
const app = express();

// Setting static files and view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/css/")));
app.use(express.static(path.join(__dirname, "public/assests/")));
app.use(express.static(path.join(__dirname, "public/js/")));

// Middleware
app.use(express.json());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(cookieParser());
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const PORT = process.env.PORT || 5000;
app.use("/", router);
// Listening on port
app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
