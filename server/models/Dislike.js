const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dislikeSchema = new Schema(
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

const Dislike = mongoose.model("Dislike", dislikeSchema);
module.exports = Dislike;
