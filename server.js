require("dotenv").config();
const express = require("express");
const app = express();
const errmiddle = require("./middleware/errmiddleware");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/posRoute");
const authRoute = require("./routes/authRoute");
const bankRoute = require("./routes/bankRoute");
const animalRoute = require("./routes/animalsRoute");

const cors = require("cors");
const PORT = process.env.PORT;
const morgan = require("morgan");

app.use(errmiddle);
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

connectDB();

app.use("/transaction", bankRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/auth", authRoute);
app.use("/animals", animalRoute);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
