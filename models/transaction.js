const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date },
  amount: { type: Number, required: true },
  message: { type: String },
});

const Transaction = mongoose.model(
  "Transaction",
  transactionSchema,
  "transactions"
);

module.exports = Transaction;
