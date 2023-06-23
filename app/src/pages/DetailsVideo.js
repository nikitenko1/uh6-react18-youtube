import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  checkDisLikeVideo,
  checkLike,
  clearVideo,
  getVideoById,
  setIsDisLike,
  setIsLike,
} from "../redux/slice/videoSlice";
import Title from "../components/shared/Title";
import VideoInfo from "../components/video/VideoInfo";
import VideoInfoWriter from "../components/video/VideoInfoWriter";
import { getCommentApi } from "../api/commentApi";
import { descViewApi } from "../api/videoApi";
import { addVideoLocal } from "../utils/localStrorage";
import PageNotFound from "./PageNotFound";
import Loading from "../components/loading/Loading";
import VideoCardRow from "../components/video/VideoCardRow";
import InputComment from "../components/comment/InputComment";
import CommentList from "../components/comment/CommentList";

const DetailsVideo = () => {
  const { id } = useParams();
  const [commentList, setCommentList] = useState([]);

  const addComment = (comment) => {
    setCommentList([...commentList, comment]);
  };

  const deleteComment = (id) => {
    const newListComment = commentList.filter((p) => p._id !== id);
    setCommentList(newListComment);
  };

  const { video, loading, videoRecommend, likeCount, disLikeCount, error } = useSelector(
    (state) => state.video
  );
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      const res = await getCommentApi(id);
      if (res.data.success) {
        setCommentList(res.data.comments);
      }
    };
    // then call it here
    loadData();
  }, [id]);

  useEffect(() => {
    // wrap your async call here
    const loadData = async () => {
      dispatch(getVideoById(id));
    };
    // then call it here
    loadData();
  }, [id, dispatch]);

  useEffect(() => {
    if (!currentUser) return dispatch(setIsLike(false));
    dispatch(checkLike(id));
  }, [id, currentUser, dispatch]);

  useEffect(() => {
    if (!currentUser) return dispatch(setIsDisLike(false));
    dispatch(checkDisLikeVideo(id));
  }, [id, currentUser, dispatch]);

  useEffect(() => {
    if (video._id) {
      addVideoLocal({
        ...video,
        viewAt: Date.now(),
      });
    }
  }, [video]);

  useEffect(() => {
    descViewApi(id);
  }, [id]);

  if (error) return <PageNotFound />;

  return (
    <div className="text-white flex md:flex-row flex-col">
      <Title title={`${video?.title || "Video sharing website"} | UA You`} />

      <div className="w-full md:w-[60%]">
        {video?.videoUrl && (
          <video
            src={video?.videoUrl}
            controls
            className="w-full aspect-video"
            poster={video?.videoUrl?.split(".mp4")[0] + ".jpg"}
          />
        )}
        <VideoInfo likeCount={likeCount} disLikeCount={disLikeCount} video={video} />
        <VideoInfoWriter video={video} />
        <InputComment addComment={addComment} />
        <CommentList deleteComment={deleteComment} commentList={commentList} />
      </div>
      <div className="flex-1 md:ml-5 pt-8 md:pt-0 overflow-auto">
        {videoRecommend.length > 1 ? (
          videoRecommend
            ?.filter((p) => p._id !== id)
            .map((p) => (
              <VideoCardRow percentImg={"40%"} maxlengthTitle={25} key={p._id} data={p} />
            ))
        ) : (
          <div className="flex items-center justify-center py-2">No Videos Recommend!</div>
        )}
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default DetailsVideo;
