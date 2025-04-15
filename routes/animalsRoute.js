const express = require("express");
const {
  getAnAnimal,
  getAnimals,
  addAnimal,
} = require("../controllers/animalsController");
const router = express.Router();

router.get("/", getAnimals);
router.get("/:id", getAnAnimal);
router.post("/add", addAnimal);
module.exports = router;
