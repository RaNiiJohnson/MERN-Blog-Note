require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");
const storyRoutes = require("./routes/storyRoute");
const cors = require("cors");
const bodyParser = require("body-parser");
const { checkUser } = require("./middleware/authMiddleware");
const requireAuth = require("./middleware/authMiddleware");

const app = express();
app.use(cors({ origin: true }));

mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/M_E_R_N")
  .then(
    app.listen(5000, () => {
      console.log("connected on port 5000");
    })
  )
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(req.user._id);
});

app.use("/user", userRoutes);
app.use("/story", storyRoutes);
