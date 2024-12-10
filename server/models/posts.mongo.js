const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  postNumber: {
    type: Number,
    required: true,
  },
  body: {
    type: String,
  },
  postTitle: {
    type: String,
    required: true,
  },
  postDate: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Post", postsSchema);
