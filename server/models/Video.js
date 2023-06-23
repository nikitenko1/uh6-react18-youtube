const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    videoThumbnail: {
      type: String,
    },
    totalView: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

videoSchema.index({ title: "text" });

const Video = mongoose.model("Video", videoSchema);
Video.createIndexes({ title: "text" });
module.exports = Video;
