import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Spin } from "react-cssfx-loading";
import { clearVideo, getChannelVideo } from "../../redux/slice/channelSlice";
import GridLayout from "../../components/shared/GridLayout";
import NoResults from "../../components/shared/NoResults";
import SkeletonVideoCard from "../../components/skeleton/SkeletonVideoCard";
import VideoCard from "../../components/video/VideoCard";

const VideoPage = () => {
  const { videos, totalPage } = useSelector((state) => state.channel);

  const { currentUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(getChannelVideo({ id, page }));
      setLoading(false);
    })();

    return () => {
      setPage(1);
      dispatch(clearVideo());
    };
  }, [id]);

  useEffect(() => {
    (async () => {
      if (page === 1) return;
      setLoadMore(true);
      await dispatch(getChannelVideo({ id, page }));
      setLoadMore(false);
    })();
  }, [id, page]);

  if (loading)
    return (
      <div className="mt-10">
        <SkeletonVideoCard item={4} />
      </div>
    );

  if (videos.length === 0) return <NoResults />;

  return (
    <div className="mt-10">
      <GridLayout>
        {videos.map((p) => (
          <VideoCard edit={currentUser?._id === p?.writer?._id} key={p._id} data={p} />
        ))}
      </GridLayout>
      {loadMore && (
        <div className="flex py-3 justify-center">
          <Spin />
        </div>
      )}
      {page < totalPage && (
        <div className="py-3 text-center w-full">
          <button
            onClick={() => setPage(page + 1)}
            className="py-2 px-3 bg-[#bc13fe] text-white rounded-md"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPage;
