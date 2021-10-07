const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  formId: {
    type: String,
  },
  responses: [{}],
});

userSchema.pre("save", function (next) {
  console.log("User about to be created", this);
  next();
});

const Member = mongoose.model("response", userSchema);
module.exports = Member;
