const { default: axios } = require("axios");
const { replaceS3BaseUrl } = require("../../utils");
var TracksServices = require("./TrackServices");

module.exports = {
  CreateTracks: async (req, res) => {
    try {
      const pl = await TracksServices.CreateTracks(req.body);

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

  GetTracksAll: async (req, res) => {
    let condition = {
      playlistId: req.params.id,
    };
    console.log(
      "🚀 ~ file: TrackControllers.js:35 ~ GetTracksAll: ~ condition.req.params._id:",
      req.params.id
    );
    TracksServices.GetTracks(condition, 1, 999)
      .then(function (result) {
        return res.json({ data: result });
      })
      .catch(function (error) {
        console.error(error, "  - - - error = ");
        return res.json(error);
      });
  },
  SearchTrack: async (req, res) => {
    const q = req.params.q;
    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");
    data.append("client_id", process.env.SPOTIFY_ID);
    data.append("client_secret", process.env.SPOTIFY_SECRETE);
    try {
      const token = await axios.post(
        "https://accounts.spotify.com/api/token",
        data,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      const d = await axios.get(
        `https://api.spotify.com/v1/search?q=${q}&type=track&limit=50&offset=0&include_external=audio`,
        {
          headers: {
            Authorization: `Bearer ${token.data.access_token}`,
          },
        }
      );
      const dataa = d.data.tracks.items.map((val) => {
        return {
          link: val.external_urls.spotify,
          name: val.name,
          thumbnail: val.album.images,
          duration: ((ms) => {
            const minutes = Math.floor(ms / 60000); // 1 minute = 60000 ms
            const seconds = Math.floor((ms % 60000) / 1000); // Remaining seconds
            return `${minutes}:${seconds.toString().padStart(2, "0")}`; // Ensures two-digit seconds
          })(val.duration_ms),
          artist_name: val.artists.reduce(
            (sum, val, index) =>
              index == 0 ? sum + `${val.name}` : sum + ` | ${val.name}`,
            ""
          ),
          trackId: val.id,
        };
      });
      res.status(200).send({
        data: dataa,
      });
    } catch (error) {
      res.status(400).send({
        error,
      });
    }

    // const data = d.map((val) => {});
  },

  DeleteTracks: function (req, res) {
    let condition = {
      _id: req.query.id,
    };
    TracksServices.DeleteTracks(condition)
      .then(function (result) {
        return res.json(result);
      })
      .catch(function (error) {
        console.error(error, "  - - - error = ");
        return res.json(error);
      });
  },
};
