const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter an username"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter an password"],
  },
});

// Function fired after the new user saved
// userSchema.post("save", function (doc, next) {
//   console.log("New user was created & saved");
//   next();
// });
// Fire a function before the doc is saved
userSchema.pre("save", function (next) {
  console.log("User about to be created", this);
  next();
});

// static method to login user
userSchema.statics.login = async function (email) {
  const user = await this.findOne({ email: email });
  if (user) {
    return user;
  }
  throw Error("incorrect id");
};

const User = mongoose.model("webcust", userSchema);
module.exports = User;
