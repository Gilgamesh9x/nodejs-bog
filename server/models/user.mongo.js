const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.Mixed,
  },
});

module.exports = mongoose.model("User", userSchema);
