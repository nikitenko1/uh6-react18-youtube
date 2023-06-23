import axiosClient from "./axiosClient";

export const getUserInfoApi = () => {
  return axiosClient.get("/api/user");
};

export const loginUserApi = (data) => {
  return axiosClient.post("/api/user/login", data);
};

export const registerUserApi = (data) => {
  return axiosClient.post("/api/user/register", data);
};
