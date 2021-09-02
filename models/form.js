const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
  },
  formId: {
    id: String,
  },
  url: {
    type: String,
  },
  arObj: [
    {
      question: String,
      answer: String,
      options: String,
      noOfItem: [],
    },
  ],
  responses: [{}],
});
userSchema.pre("save", function (next) {
  console.log("User about to be created", this);
  next();
});
const Member = mongoose.model("webform", userSchema);
module.exports = Member;
