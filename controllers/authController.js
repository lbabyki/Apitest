const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "Email đã tồn tại" });

  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);
  const newUser = new User({ name, email, password: hashpassword });
  await newUser.save();
  res.status(201).json({
    message: "Đăng ký thành công",
    user: { id: newUser._id, name: newUser.name, email: newUser.email },
  });
};

//lấy dữ liệu từ req
//kiểm tra xe có user tồn tại chưa
// tạo salt = bcrypt.gensalt(10);
// hashpassword = bcrypt.hash(password,salt);
// tạo user mới
// save vào database
//trả dữ liệu json user với mới tạo cho frontend

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "Người dùng không tồn tại" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Mật khẩu không đúng" });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
  res.status(200).json(token);
};

//Lấy dữ liệu từ req
// kiểm tra user có tồn tại
//kiểm tra password bằng const isMatch = await bcrypt.compare(password, user.password);
//Xử lý nếu khôgn đúng mật khẩu;
// nếu đúng thì token = jwt.sign({id:user_id},process.env.JWT_SECRET,{expiresIN:"1h"});
// trả token và userID: user_id cho frontend

module.exports = { register, login };
