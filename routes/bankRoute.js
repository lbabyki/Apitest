const express = require("express");
const router = express.Router();
const { addTransaction, getTransaction } = require("../controllers/bank");

router.post("/api/add", addTransaction);
router.get("/", getTransaction);
module.exports = router;
