const Subscription = require("../models/Subscription");

const subscriptionChannel = async (req, res) => {
  try {
    const subscription = new Subscription({
      userId: req.userId,
      channelId: req.body.channelId,
    });
    await subscription.save();

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

const checkSubSubscription = async (req, res) => {
  try {
    let isSubscription = false;

    const check = await Subscription.find({
      userId: req.userId,
      channelId: req.params.channelId,
    });
    if (check.length > 0) {
      isSubscription = true;
      return res.json({
        isSubscription,
      });
    }

    return res.json({
      isSubscription,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const unSubscription = async (req, res) => {
  try {
    await Subscription.findOneAndDelete({
      userId: req.userId,
      channelId: req.params.channelId,
    });

    return res.json({
      success: true,
      message: "unsub success!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSubscription = async (req, res) => {
  try {
    const subscriptionCount = await Subscription.find({
      channelId: req.params.channelId,
    });

    return res.json({
      success: true,
      subscriptionCount: subscriptionCount.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  subscriptionChannel,
  checkSubSubscription,
  unSubscription,
  getSubscription,
};
