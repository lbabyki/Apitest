// Mẫu để cho vui thôi
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Post = mongoose.model("Post", postSchema, "posts");

module.exports = Post;
