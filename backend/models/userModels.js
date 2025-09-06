const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  nUser: { type: String, required: true },
  pword: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("users", userModel);