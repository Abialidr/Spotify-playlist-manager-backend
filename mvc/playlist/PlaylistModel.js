const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const playlistSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    thumbnail: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: true, default: "" },
    userId: { type: String, required: false, trim: true, default: "" },
    tracks: { type: Array, default: [] },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

playlistSchema.index({
  name: "text",
});
module.exports = mongoose.model("playlist", playlistSchema);
