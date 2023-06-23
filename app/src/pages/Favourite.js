import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideoFavourite } from "../redux/slice/videoFavouriteSlice";
import PageNotFound from "./PageNotFound";
import WantLogin from "../components/shared/WantLogin";
import NoResults from "../components/shared/NoResults";
import Title from "../components/shared/Title";
import LoadingSpin from "../components/loading/LoadingSpin";
import VideoCardRow from "../components/video/VideoCardRow";

const FavouritePage = () => {
  const { videos, error, loading } = useSelector((state) => state.favourite);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) return;
    dispatch(getVideoFavourite());
  }, [dispatch, currentUser]);

  if (!currentUser) return <WantLogin />;

  if (loading) return <LoadingSpin />;

  if (error) return <PageNotFound />;

  if (videos.length === 0) return <NoResults />;

  return (
    <div className="w-full text-white">
      <Title title={"Trending | UA You - Video sharing website"} />
      {videos.map((p) => (
        <VideoCardRow maxlengthTitle={30} key={p._id} data={p} />
      ))}
    </div>
  );
};

export default FavouritePage;
