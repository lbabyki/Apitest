const User = require("../models/user");

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send("Lỗi không tìm thấy dữ liệu người dùng", err);
  }
};
const getOnce = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("khong tim thay user");
    res.status(201).json({ message: "Tim thay user", user });
  } catch (err) {
    res.status(500).send("loi khi tim nguoi dung");
  }
};
const addUser = async (req, res) => {
  try {
    const { name, age, email, address } = req.body;
    const newUser = new User({ name, age, email, address });
    await newUser.save();
    res.status(201).send("User is created");
  } catch (err) {
    res.status(500).send("Error created User", err);
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).send("khong tim thay user");
    res.status(201).json({ message: "Update thanh cong", user });
  } catch (err) {
    res.status(500).send("loi khi cap nhat nguoi dung", err);
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("khong tim thay user");
    res.status(200).send("User da bi xoa");
  } catch (err) {
    res.status(500).send("Loi khi cap nhat user", err);
  }
};
module.exports = { getUser, addUser, updateUser, deleteUser, getOnce };
