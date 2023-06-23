const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema(
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

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;
