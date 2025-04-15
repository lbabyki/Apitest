const express = require("express");
const Transaction = require("../models/transaction");

const addTransaction = async (req, res) => {
  const { accountNumber, name, date, amount, message } = req.body;
  try {
    const newTransaction = new Transaction({
      accountNumber,
      name,
      date,
      amount,
      message,
    });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(401).json({ message: "Dữ liệu không hợp lệ" }, err);
  }
};

const getTransaction = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 11;
    const skip = (page - 1) * limit;

    const {
      accountNumber = "",
      message = "",
      name = "",
      amount = "",
    } = req.query;

    const sort = req.query.sort || "-date";
    let filter = {
      accountNumber: { $regex: accountNumber, $options: "i" },
      message: { $regex: message, $options: "i" },
      name: { $regex: name, $options: "i" },
    };

    const transactions = await Transaction.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Transaction.countDocuments(filter);
    res.status(200).json({
      total,
      page,
      totalPage: Math.ceil(total / limit),
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({ message: "lỗi không lấy được dữ liệu ngân hàng" });
  }
};

module.exports = { addTransaction, getTransaction };
