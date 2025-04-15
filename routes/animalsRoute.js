const express = require("express");
const { getAnAnimal, getAnimals } = require("../controllers/animalsController");
const router = express.Router();

router.get("/", getAnimals);
router.get("/:id", getAnAnimal);
module.exports = router;
