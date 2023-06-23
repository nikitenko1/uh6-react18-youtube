const Dislike = require("../models/Dislike");
const Like = require("../models/Like");
const Video = require("../models/Video");
const Subscription = require("../models/Subscription");

const getAllVideos = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 12;
  const skip = (page - 1) * limit;
  const total = await Video.countDocuments();

  try {
    const video = await Video.find().limit(limit).skip(skip).populate("writer").sort("-createdAt");
    console.log(video.length);
    return res.json({
      success: true,
      videos: video,
      totalPage: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addNewVideo = async (req, res) => {
  if (req.body.videoUrl.includes("security"))
    return res.status(400).json({
      success: false,
      message: "You do not have permission to upload videos!",
    });

  try {
    const { title, description, videoUrl } = req.body;
    if (!title || !description || !videoUrl)
      return res.status(400).json({
        success: false,
        message: "Missing paramaters!",
      });

    const newVideo = new Video({
      ...req.body,
      writer: req.userId,
    });
    await newVideo.save();
    return res.status(203).json({
      success: true,
      video: newVideo,
      message: "upload video success!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVideoById = async (req, res) => {
  const _id = req.params.id;
  let skipDocument = 0;
  try {
    const totalVideo = await Video.countDocuments();

    function getRandomArbitrary(min, max) {
      return Math.ceil(Math.random() * (max - min) + min);
    }
    if (totalVideo > 10) {
      skipDocument = getRandomArbitrary(0, totalVideo - 10);
    }

    const [like, dislike, videoRandom, video] = await Promise.all([
      Like.find({ videoId: _id }),
      Dislike.find({ videoId: _id }),
      Video.find()
        .populate("writer")
        .skip(skipDocument)
        .sort("-createdAt")
        .limit(10)
        .sort("-createdAt"),
      Video.findOne({ _id }).populate("writer"),
    ]);

    return res.json({
      success: true,
      video,
      videoRecommend: videoRandom,
      likeCount: like.length,
      disLikeCount: dislike.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const likeVideo = async (req, res) => {
  const userId = req.userId;
  const videoId = req.body.videoId;

  try {
    const newLike = new Like({
      videoId,
      userId,
    });
    await newLike.save();
    return res.json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const checkLikeVideo = async (req, res) => {
  let isLike = false;

  try {
    const check = await Like.find({
      videoId: req.params.videoId,
      userId: req.userId,
    });
    if (check.length !== 0) {
      isLike = true;
      return res.json({
        isLike,
      });
    }
    return res.json({
      isLike,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const unLikeVideo = async (req, res) => {
  try {
    await Like.findOneAndDelete({
      videoId: req.params.videoId,
      userId: req.userId,
    });
    return res.json({
      success: true,
      message: "unlike success!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const disLikeVideo = async (req, res) => {
  const userId = req.userId;
  const videoId = req.body.videoId;

  try {
    const newLike = new Dislike({
      videoId,
      userId,
    });
    await newLike.save();
    return res.json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const checkDisLikeVideo = async (req, res) => {
  let isDisLike = false;

  try {
    const check = await Dislike.find({
      videoId: req.params.videoId,
      userId: req.userId,
    });
    if (check.length !== 0) {
      isDisLike = true;
      return res.json({
        isDisLike,
      });
    }
    return res.json({
      isDisLike,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const unDisLikeVideo = async (req, res) => {
  try {
    await Dislike.findOneAndDelete({
      videoId: req.params.videoId,
      userId: req.userId,
    });
    return res.json({
      success: true,
      message: "unlike success!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVideoSubscription = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 12;
  const skip = (page - 1) * limit;

  try {
    const videoSubscriptions = await Subscription.find({ userId: req.userId });
    const channelId = [];
    videoSubscriptions.forEach((videoSubscription) => {
      channelId.push(videoSubscription.channelId);
    });

    const total = await Video.countDocuments({ writer: { $in: channelId } });

    const results = await Video.find({ writer: { $in: channelId } })
      .populate("writer")
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);

    return res.json({
      success: true,
      videos: results,
      totalPage: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const descView = async (req, res) => {
  try {
    const views = await Video.findOne({ _id: req.params.videoId });
    if (views.totalView) {
      views.totalView += 1;
      views.save();
    } else {
      views.totalView = 1;
      views.save();
    }
    return res.json({
      success: true,
      message: "Desc view success!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTrendingVideo = async (req, res) => {
  try {
    const videos = await Video.find().limit(10).sort("-totalView").populate("writer");
    return res.status(200).json({
      success: true,
      videos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const searchVideo = async (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm.trim()) {
    return res.status(400).json({
      success: false,
      message: "Missing paramaters!",
    });
  }

  try {
    const textReg = new RegExp(searchTerm, "i");
    const results = await Video.find({
      title: textReg,
    })
      .populate("writer")
      .sort("-totalView");
    return res.json({
      success: true,
      results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getLikeVideo = async (req, res) => {
  const userId = req.userId;
  try {
    const like = await Like.find({ userId });
    const videoIdLike = [];

    like.forEach((p) => videoIdLike.push(p.videoId));
    const videos = await Video.find({ _id: { $in: videoIdLike } }).populate("writer");
    return res.json({
      success: true,
      videos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const editVideo = async (req, res) => {
  const _id = req.params.id;
  const userId = req.userId;

  try {
    const updateVideo = await Video.findOne({ _id });

    if (updateVideo.writer == userId) {
      const updatedVideo = await Video.findOneAndUpdate(
        { _id },
        {
          title: req.body.title,
          description: req.body.description,
          videoThumnail: req.body.videoThumnail,
        }
      );

      if (updatedVideo) {
        return res.json({
          success: true,
          video: {
            _id,
            ...req.body,
          },
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "You are not authorized to edit this video!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteVideo = async (req, res) => {
  const _id = req.params.id;
  const userId = req.userId;
  const deleteVideo = await Video.findOne({ _id });
  if (deleteVideo.writer == userId) {
    try {
      const deleteVideo = await Video.findOneAndDelete({ _id });
      if (deleteVideo) {
        return res.json({
          success: true,
          message: "Delete success!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "You are not authorized to delete this video!",
    });
  }
};

module.exports = {
  getAllVideos,
  addNewVideo,
  getVideoById,
  likeVideo,
  checkLikeVideo,
  unLikeVideo,
  disLikeVideo,
  checkDisLikeVideo,
  unDisLikeVideo,
  getVideoSubscription,
  descView,
  getTrendingVideo,
  searchVideo,
  getLikeVideo,
  editVideo,
  deleteVideo,
};
