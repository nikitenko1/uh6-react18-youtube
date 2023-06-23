import React, { useEffect, useState } from "react";
import Title from "../components/shared/Title";
import VideoCardRow from "../components/video/VideoCardRow";
import LoadingSpin from "../components/loading/LoadingSpin";
import { getVideoTrendingApi } from "../api/videoApi";

const TrendingPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getVideoTrendingApi();
        if (res.data.success) {
          setVideos(res.data.videos);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <LoadingSpin />;

  return (
    <div className="w-full text-white">
      <Title title={"Trending | UA You - Video sharing website"} />
      {videos.map((p) => (
        <VideoCardRow maxlengthTitle={30} key={p._id} data={p} />
      ))}
    </div>
  );
};

export default TrendingPage;
