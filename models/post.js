const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
});

const Post = mongoose.model("Post", postSchema, "posts");

module.exports = Post;
