const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.js");
const { notFound, errorHandler } = require("./middlewares/errorMiddleWare.js");
const cors = require("cors");
const userRouter = require("./mvc/user/userRouter.js");
const PlaylistRoutes = require("./mvc/playlist/PlaylistRoutes.js");
const TracksRouter = require("./mvc/track/TrackRoutes.js");

require("dotenv").config();
const app = express();
connectDB();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    parameterLimit: 10000000000000000000,
    limit: "1000mb",
    extended: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use("/user", userRouter);
app.use("/playlist", PlaylistRoutes);
app.use("/track", TracksRouter);
app.get("/", (req, res) => {
  res.send("Working");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`Server Running On ${PORT}`));
