const User = require("../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const saltRounds = 10;

const handleError = (err) => {
  //   console.log(err.message, err.code);
  let errors = { message: "" };

  //duplicate error code
  errors.message = "User Already exists";

  return errors;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = function (id) {
  return jwt.sign({ id }, "secretkey", {
    expiresIn: maxAge,
  });
};
module.exports.signup_get = (req, res) => {
  res.render("register");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.signup_post = async (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    try {
      const member = await User.create({ name, email, password: hash });

      const token = createToken(member._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.redirect("/createForm/" + member.email);
    } catch (err) {
      console.log(err);
      res.redirect("/login");
    }
  });
};

module.exports.login_post = async (req, res) => {
  const { email, passwd } = req.body;

  try {
    const user = await User.login(email);
    bcrypt.compare(passwd, user.password, function (err, result) {
      if (result) {
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.redirect("/createForm/" + user.email);
      } else {
        console.log("wrong pass");
        res.redirect("/login");
      }
    });
  } catch (err) {
    console.log(err);
    res.redirect("/signup");
  }
};

module.exports.forgot_get = (req, res) => {
  res.render("forgot");
};
module.exports.forgot_post = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.login(email);
    async function main() {
      let testAccount = await nodemailer.createTestAccount();
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: process.env.EMAIL, // sender address
        to: user.email, // list of receivers
        subject: "WebForms", // Subject line
        text: `Greetings, participant!
      
          Hello!
          
          Stay tuned!
          Warmest regards,
         WebForms`,
        html: `<p style="font-size:20px;background:orange;border:3px;border-radius:15px;box-shadow:10px;color:black;padding:20px"><strong><bold>WebForms</bold></strong><br/><br/><br/>Kindly click on the link to reset password<br/><br/><a href="http://localhost:5000/reset/${user.email}">Link</a><br/><br/>Stay tuned!<br/>Warmest regards,<br/>WebForms, SRMIST<br/></p>`,
        // html: "<b>Hello world?</b>", // html body
      });
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    main().catch(console.error);
    res.redirect("/check");
  } catch (err) {
    res.redirect("/signup");
  }
};
module.exports.reset_get = (req, res) => {
  res.render("reset", {
    email: req.params.pass,
  });
};
module.exports.reset_post = (req, res) => {
  const { passwd } = req.body;
  const email = req.params.pass;

  bcrypt.hash(passwd, saltRounds, async function (err, hash) {
    try {
      const user = await User.findOneAndUpdate(
        { email: email },
        {
          password: hash,
        }
      );
      res.redirect("/createForm/" + user.email);
    } catch (err) {
      console.log(err);
    }
  });
};
module.exports.logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(1),
  });
  res.redirect("/login");
};
