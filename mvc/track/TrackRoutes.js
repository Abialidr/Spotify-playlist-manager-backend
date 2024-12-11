var express = require("express");
var TracksRouter = express.Router();
var TrackControllers = require("./TrackControllers");
var { protect, protect } = require("../../middlewares/authMiddleware");
const uploadMulter = require("../../middlewares/mediaUpload");

TracksRouter.post("/create", protect, TrackControllers.CreateTracks);
TracksRouter.get("/getall/:id", protect, TrackControllers.GetTracksAll);
TracksRouter.get("/getTrack/:q", protect, TrackControllers.SearchTrack);
TracksRouter.delete("/delete", protect, TrackControllers.DeleteTracks);

module.exports = TracksRouter;
