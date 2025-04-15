const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  animalName: { type: String, required: true },
  subtitle: { type: String },
  videoDescription: { type: String, required: true },
  animalInfoHtml: { type: String },
  threatInfoHtml: { type: String },
  hunted: { type: Boolean, default: false },
  rescueData: {
    rescued: { type: Number, default: 0 },
    recoveryProcess: { type: String },
  },
  sponsorImages: [{ type: String }],
});

const Animal = mongoose.model("Animal", animalSchema, "animals");
module.exports = Animal;
