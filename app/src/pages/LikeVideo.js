import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WantLogin from "../components/shared/WantLogin";
import NoResults from "../components/shared/NoResults";
import LoadingSpin from "../components/loading/LoadingSpin";
import Title from "../components/shared/Title";
import VideoCardRow from "../components/video/VideoCardRow";
import { getLikeVideoApi } from "../api/videoApi";
import { toast } from "react-toastify";

const LikeVideoPage = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    (async () => {
      setLoading(true);
      try {
        const res = await getLikeVideoApi();
        if (res.data.success) {
          setVideos(res.data.videos);
        }
      } catch (error) {
        toast.error(error.message);
      }
      setLoading(false);
    })();
  }, [currentUser]);

  if (!currentUser) return <WantLogin />;

  if (loading) return <LoadingSpin />;

  if (videos.length === 0) return <NoResults />;

  return (
    <div className="w-full text-white">
      <Title title={"Liked Video | UA You - Video sharing website"} />
      {videos.map((p) => (
        <VideoCardRow maxlengthTitle={30} key={p._id} data={p} />
      ))}
    </div>
  );
};

export default LikeVideoPage;
