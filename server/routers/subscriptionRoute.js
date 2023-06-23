const express = require("express");
const route = express.Router();
const IsLogin = require("../middleware/IsLogin");
const {
  checkSubSubscription,
  getSubscription,
  subscriptionChannel,
  unSubscription,
} = require("../controllers/subscriptionControllers");

// GET
// get subscription count
route.get("/:channelId", getSubscription);

// POST
// Subscription channel
// Private
route.post("/", IsLogin, subscriptionChannel);

// GET
// Check subscription
route.get("/check-sub/:channelId", IsLogin, checkSubSubscription);

// DELETE
// Unsub
// Private
route.delete("/:channelId", IsLogin, unSubscription);

module.exports = route;
