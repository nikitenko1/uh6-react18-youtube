const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const userRoute = require("../routers/userRoute");
const videoRoute = require("../routers/videoRoute");
const channelRoute = require("../routers/channelRoute");
const favouriteRoute = require("../routers/video_favouriteRoute");
const subscriptionRoute = require("../routers/subscriptionRoute");
const commentRoute = require("../routers/commentRoute");

const app = express();

const URL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.x6poucy.mongodb.net/youtube?retryWrites=true&w=majority`;
// connectDB
const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("connect DB success!");
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
};

connectDB();

// config body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
// cors
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send("Hello word");
});
// config route
app.use("/api/user", userRoute);
app.use("/api/video", videoRoute);
app.use("/api/channel", channelRoute);
app.use("/api/favourite", favouriteRoute);
app.use("/api/sub", subscriptionRoute);
app.use("/api/comment", commentRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}!`);
});
