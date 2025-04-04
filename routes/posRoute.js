const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPost,
  addPost,
  delPost,
  updatePost,
} = require("../controllers/postController");

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/add", addPost);
router.delete("/delete/:id", delPost);
router.put("/update/:id", updatePost);

module.exports = router;
