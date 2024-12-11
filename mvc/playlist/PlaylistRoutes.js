var express = require("express");
var PlaylistsRouter = express.Router();
var PlaylistControllers = require("./PlaylistControllers");
var { protect, protect } = require("../../middlewares/authMiddleware");
const uploadMulter = require("../../middlewares/mediaUpload");

PlaylistsRouter.post(
  "/create",
  [
    protect,
    uploadMulter.fields([
      {
        name: "thumbnail",
        maxCount: 1,
      },
    ]),
  ],
  PlaylistControllers.CreatePlaylists
);
PlaylistsRouter.get("/getall", protect, PlaylistControllers.GetPlaylistsAll);
PlaylistsRouter.patch(
  "/update",
  [
    protect,
    uploadMulter.fields([
      {
        name: "thumbnail",
        maxCount: 1,
      },
    ]),
  ],
  PlaylistControllers.UpdatePlaylists
);
PlaylistsRouter.delete("/delete", protect, PlaylistControllers.DeletePlaylists);

module.exports = PlaylistsRouter;
