const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    lowercase: true,
  },
  formId: {
    type: String,
  },
  url: {
    type: String,
  },
  arObj: [],
});
userSchema.pre("save", function (next) {
  console.log("User about to be created", this);
  next();
});
const Member = mongoose.model("form", userSchema);
module.exports = Member;
