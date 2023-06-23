export const getVideoLocal = () => {
  const history_video = JSON.parse(localStorage.getItem("ua-you-history")) || [];

  const results = history_video.sort((a, b) => b.viewAt - a.viewAt);

  return results;
};

export const addVideoLocal = (video) => {
  const history_video = JSON.parse(localStorage.getItem("ua-you-history")) || [];

  const checkVideoExist = history_video.some((p) => p._id === video._id);

  if (!checkVideoExist) {
    history_video.push(video);
    localStorage.setItem("ua-you-history", JSON.stringify(history_video));
  }
};
