import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkSubSubscriptionApi,
  getSubscriptionApi,
  subscriptionChannelApi,
  unSubscriptionApi,
} from "../../api/subscriptionApi";

const initialState = {
  isSubscription: false,
  subscriptionCount: 0,
  error: false,
  isCheck: false,
};

export const subscriptionChannel = createAsyncThunk("sub/subscriptChannel", async (data) => {
  await subscriptionChannelApi(data);
});

export const checkSubscription = createAsyncThunk("sub/checkSubscript", async (channelId) => {
  const res = await checkSubSubscriptionApi(channelId);
  return res.data;
});

export const unSubscription = createAsyncThunk("sub/unSubscription", async (channelId) => {
  await unSubscriptionApi(channelId);
});

export const getSubscription = createAsyncThunk("sub/getSubscription", async (channelId) => {
  const res = await getSubscriptionApi(channelId);
  return res.data;
});

const subscriptionSlice = createSlice({
  name: "sub",
  initialState,
  reducers: {
    setSubscriptions: (state, action) => {
      state.isSubscription = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(subscriptionChannel.pending, (state) => {
      state.isSubscription = true;
      state.subscriptionCount += 1;
    });
    builder.addCase(subscriptionChannel.fulfilled, (state) => {
      state.error = false;
    });
    builder.addCase(subscriptionChannel.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(checkSubscription.pending, (state) => {
      state.isCheck = true;
    });
    builder.addCase(checkSubscription.fulfilled, (state, action) => {
      state.isSubscription = action.payload.isSubscription;
      state.isCheck = false;
    });
    builder.addCase(unSubscription.pending, (state) => {
      state.isSubscription = false;
      state.subscriptionCount -= 1;
    });
    builder.addCase(unSubscription.fulfilled, (state) => {
      state.error = false;
    });
    builder.addCase(unSubscription.rejected, (state) => {
      state.error = true;
    });
    builder.addCase(getSubscription.fulfilled, (state, action) => {
      state.subscriptCount = action.payload.subscriptionCount;
    });
  },
});

export const { setSubscriptions } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
