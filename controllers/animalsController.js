const express = require("express");
const Animal = require("../models/animals");

//Get animals

const getAnimals = async (req, res) => {
  try {
    const post = await Post.find().populate("author", "name age email");
    res.status(200).json(post);
  } catch (err) {
    res.status(500).send("loi khi tai posts", err);
  }
};
const getAnAnimal = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal)
      return res.status(404).json({ message: "Không tìm thấy animal" });
    res.status(201).json(animal);
  } catch (err) {
    res.status(500).json({ message: "Lỗi lấy dữ liệu" });
  }
};
module.exports = { getAnimals, getAnAnimal };
