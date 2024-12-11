const { replaceS3BaseUrl } = require("../../utils");
var PlaylistsServices = require("./PlaylistServices");

module.exports = {
  CreatePlaylists: async (req, res) => {
    try {
      const data = {
        name: req.body?.name ? req.body?.name : "",
        thumbnail: req.files?.thumbnail
          ? replaceS3BaseUrl(req.files?.thumbnail[0].location)
          : null,
        description: req.body?.description ? req.body?.description : "",
        userId: req.user._id,
      };
      pl = await PlaylistsServices.CreatePlaylists(data);

      if (pl) {
        res.status(200).send({
          message: "Account created successfully",
          data: pl,
          success: true,
        });
      }
    } catch (error) {
      console.error(
        `🚀 ~ file: CustomerControllers.js:64 ~ CreateAccount: ~ error:`,
        error
      );
      res.status(400).send({
        message: "Something went wrong",
        error,
        data: [],
        success: false,
      });
    }
  },

  GetPlaylistsAll: async (req, res) => {
    let condition = {
      userId: req.user._id,
    };
    PlaylistsServices.GetPlaylists(condition, 1, 999)
      .then(function (result) {
        return res.json({ data: result });
      })
      .catch(function (error) {
        console.error(error, "  - - - error = ");
        return res.json(error);
      });
  },

  UpdatePlaylists: (req, res) => {
    const data = {
      name: req.body?.name ? req.body?.name : "",
      ...(req.files?.thumbnail
        ? { thumbnail: replaceS3BaseUrl(req.files?.thumbnail[0].location) }
        : {}),
      description: req.body?.description ? req.body?.description : "",
    };
    let condition = {
      _id: req.body?._id,
    };
    PlaylistsServices.UpdatePlaylists(condition, data)
      .then(function (result) {
        return res.json(result);
      })
      .catch(function (error) {
        console.error(error, "  - - - error = ");
        return res.json(error);
      });
  },

  DeletePlaylists: function (req, res) {
    let condition = {
      _id: req.query.id,
    };
    PlaylistsServices.DeletePlaylists(condition)
      .then(function (result) {
        return res.json(result);
      })
      .catch(function (error) {
        console.error(error, "  - - - error = ");
        return res.json(error);
      });
  },
};
