require("dotenv").config();
const express = require("express");
const app = express();
const errmiddle = require("./middleware/errmiddleware");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/posRoute");
const cors = require("cors");
const PORT = process.env.PORT;

app.use(errmiddle);
app.use(express.json());
app.use(cors());

connectDB();

app.use("/users", userRoute);
app.use("/posts", postRoute);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
