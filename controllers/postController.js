const express = require("express");
const Post = require("../models/post");

//Get posts

const getPosts = async (req, res) => {
  try {
    const post = await Post.find().populate("author", "name age email");
    res.status(200).json(post);
  } catch (err) {
    res.status(500).send("loi khi tai posts", err);
  }
};
//Get a post
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post khong ton tai");
    res.status(201).json(post);
  } catch (err) {
    res.status(500).send("Loi khi tai post", err);
  }
};
//Create post
const addPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
      return res
        .status(400)
        .send({ message: "Thong tin bai viet chua day du" });
    }
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(200).json({ message: "Post duoc tao thanh cong", newPost });
  } catch (err) {
    res.status(500).send("Loi khi tao Post", err);
  }
};
//delete post
const delPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).send("Post khong ton tai");
    res.status(201).send("Post da duoc xoa");
  } catch (err) {
    res.status(500).send("Loi khi xoa Post", err);
  }
};
//update post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({ message: "Post da duoc chinh sua", post });
  } catch (err) {
    res.status(500).send("loi khi dang tao post");
  }
};

module.exports = { getPosts, getPost, addPost, delPost, updatePost };
