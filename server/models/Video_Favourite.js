const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const video_favouriteSchema = new Schema(
  {
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Video_Favourite = mongoose.model("Video_Favourite", video_favouriteSchema);
module.exports = Video_Favourite;
