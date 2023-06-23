import React, { useMemo } from "react";
import NoResults from "../components/shared/NoResults";
import { getVideoLocal } from "../utils/localStrorage";
import Title from "../components/shared/Title";
import VideoCardRow from "../components/video/VideoCardRow";

const HistoryVideoPage = () => {
  const videos = useMemo(getVideoLocal, []);
  if (videos.length === 0) return <NoResults />;
  return (
    <div className="w-full text-white">
      <Title title={"History Video | UA You - Video sharing website"} />
      {videos.map((p) => (
        <VideoCardRow maxlengthTitle={30} key={p._id} data={p} />
      ))}
    </div>
  );
};

export default HistoryVideoPage;
