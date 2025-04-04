const {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getOnce,
} = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.get("/", getUser);
router.get("/:id", getOnce);
router.post("/add", addUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
