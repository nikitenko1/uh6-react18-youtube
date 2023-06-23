import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import channelSlice from "./slice/channelSlice";
import infinityLoadSlice from "./slice/infinityLoadSlice";
import subscriptionSlice from "./slice/subscriptionSlice";
import videoFavouriteSlice from "./slice/videoFavouriteSlice";
import videoSlice from "./slice/videoSlice";
import logger from "redux-logger";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    auth: authSlice,
    infinity: infinityLoadSlice,
    channel: channelSlice,
    favourite: videoFavouriteSlice,
    video: videoSlice,
    sub: subscriptionSlice,
  },
});
