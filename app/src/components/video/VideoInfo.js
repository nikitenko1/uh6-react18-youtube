import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addVideoFavourite,
  deleteVideoFavourite,
  getVideoFavourite,
} from "../../redux/slice/videoFavouriteSlice";
import { toast } from "react-toastify";
import PageNotFound from "../../pages/PageNotFound";
import { calculateCreatedTime } from "../../utils/formatDate";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineCheck,
  AiOutlineDislike,
  AiOutlineLike,
  AiOutlinePlus,
} from "react-icons/ai";
import ModalAuth from "../modal/ModalAuth";
import { disLikeVideo, likeVideo, unDisLikeVideo, unLike } from "../../redux/slice/videoSlice";

const VideoInfo = ({ video, likeCount, disLikeCount }) => {
  const { isLike, isDisLike, isCheckLike, isCheckDisLike } = useSelector((state) => state.video);

  const { currentUser } = useSelector((state) => state.auth);
  const { videos, loading, error } = useSelector((state) => state.favourite);

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const { id } = useParams();

  const handleLike = () => {
    if (!currentUser) return setShowModal(true);
    if (isLike) {
      dispatch(unLike(id));
    } else {
      if (isDisLike) {
        dispatch(likeVideo({ videoId: id }));
        dispatch(unDisLikeVideo(id));
        return;
      }
      dispatch(likeVideo({ videoId: id }));
    }
  };

  const handleDisLike = () => {
    if (!currentUser) return setShowModal(true);
    if (isDisLike) {
      dispatch(unDisLikeVideo(id));
    } else {
      if (isLike) {
        dispatch(disLikeVideo({ videoId: id }));
        dispatch(unLike(id));
        return;
      }
      dispatch(disLikeVideo({ videoId: id }));
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    dispatch(getVideoFavourite());
  }, [currentUser, dispatch]);

  const handleAddVideoFavourite = () => {
    if (!currentUser) return setShowModal(true);
    const check = videos.some((p) => p._id === video?._id);
    if (check) {
      const confirm = window.confirm("You want to remove this video from favorites!");
      if (confirm) {
        dispatch(deleteVideoFavourite(video?._id));
        toast.success("Video has been removed from the list!");
        return;
      }
      return;
    }

    dispatch(addVideoFavourite(video));
    toast.success("Video has been added to the list!");
  };

  if (error) return <PageNotFound />;

  return (
    <div className="py-2">
      <h1 className="text-[20px] font-semibold my-1">
        {video?.title?.length > 100 ? video?.title?.slice(0, 100) + "..." : video?.title}
      </h1>
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between justify-start">
        <div className="flex items-center">
          <p className="text-sm text-[#999] mr-1">{video?.totalView} view</p>
          <p className="text-sm text-[#999] ml-1">{calculateCreatedTime(video?.createdAt)}</p>
        </div>
        <div className="flex items-center md:mt-0 mt-3">
          <div
            className="bg-[#ffffff1a] flex items-center rounded-full relative border-[#bc13fe]
          hover:border-b-2 transition-all"
          >
            <button
              disabled={isCheckLike}
              className="flex items-center justify-center py-1 px-4"
              onClick={handleLike}
            >
              {isLike ? (
                <AiFillLike className="text-2xl" />
              ) : (
                <AiOutlineLike className="text-2xl" />
              )}

              <span className="ml-1 text-sm">{likeCount}</span>
            </button>
            <button
              disabled={isCheckDisLike}
              onClick={handleDisLike}
              className={`flex items-center justify-center py-1 px-4`}
            >
              {isDisLike ? (
                <AiFillDislike className="text-2xl" />
              ) : (
                <AiOutlineDislike className="text-2xl" />
              )}
              <span className="ml-1 text-sm">{disLikeCount}</span>
            </button>
          </div>
          <button
            disabled={loading}
            className={`flex items-center justify-center py-1 px-4 bg-[#ffffff1a] ml-1.5 rounded-full ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={handleAddVideoFavourite}
          >
            {videos.some((p) => p._id === video?._id) ? (
              <AiOutlineCheck className="text-2xl" />
            ) : (
              <AiOutlinePlus className="text-2xl" />
            )}
          </button>
        </div>
      </div>
      {showModal && <ModalAuth setShow={setShowModal} />}
    </div>
  );
};

export default VideoInfo;
