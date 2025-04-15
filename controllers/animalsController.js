const express = require("express");
const Animal = require("../models/animals");

//Get animals

const getAnimals = async (req, res) => {
  try {
    const animal = await Animal.find();
    res.status(200).json(animal);
  } catch (err) {
    res.status(500).send("loi khi tai animals", err);
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
const addAnimal = async (req, res) => {
  try {
    const {
      animalName,
      subtitle,
      videoDescription,
      animalInfoHtml,
      threatInfoHtml,
      hunted,
      rescueData,
      sponsorImages,
    } = req.body;

    const newAnimal = new Animal({
      animalName,
      subtitle,
      videoDescription,
      animalInfoHtml,
      threatInfoHtml,
      hunted,
      rescueData,
      sponsorImages,
    });

    const savedAnimal = await newAnimal.save();
    res.status(201).json(savedAnimal);
  } catch (error) {
    console.error("Error adding animal:", error);
    res.status(500).json({ message: "Failed to add animal", error });
  }
};
module.exports = { getAnimals, getAnAnimal, addAnimal };
