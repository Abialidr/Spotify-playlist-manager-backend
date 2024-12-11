const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TrackSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    artist_name: { type: String, required: true, trim: true },
    thumbnail: { type: Array, default: [], required: true },
    userId: { type: String, required: true, trim: true },
    playlistId: { type: String, required: true, trim: true },
    trackId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

TrackSchema.index({
  name: "text",
});
TrackSchema.index({ trackId: 1 }, { unique: true });
module.exports = mongoose.model("Track", TrackSchema);
