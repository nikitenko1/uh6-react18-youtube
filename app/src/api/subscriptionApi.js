import axiosClient from "./axiosClient";

export const subscriptionChannelApi = (data) => {
  return axiosClient.post("/api/sub", data);
};

export const checkSubSubscriptionApi = (channelId) => {
  return axiosClient.get(`/api/sub/check-sub/${channelId}`);
};

export const unSubscriptionApi = (channelId) => {
  return axiosClient.delete(`/api/sub/${channelId}`);
};

export const getSubscriptionApi = (channelId) => {
  return axiosClient.get(`/api/sub/${channelId}`);
};
