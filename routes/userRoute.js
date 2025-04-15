const {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getOnce,
} = require("../controllers/userController");
const protect = require("../middleware/authmiddleware");
const express = require("express");
const router = express.Router();

router.get("/", getUser);
router.get("/:id", protect, getOnce);
router.post("/add", addUser);
router.put("/update/:id", protect, updateUser);
router.delete("/delete/:id", protect, deleteUser);

module.exports = router;
