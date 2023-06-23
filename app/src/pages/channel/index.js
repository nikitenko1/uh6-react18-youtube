import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, useParams, Route } from "react-router-dom";
import { getChannelInfo } from "../../redux/slice/channelSlice";
import HomePage from "./Home";
import DescriptionPage from "./Description";
import VideoPage from "./Video";
import PageNotFound from "../PageNotFound";
import Title from "../../components/shared/Title";
import Loading from "../../components/loading/Loading";
import ChannelInfo from "../../components/channel/ChannelInfo";

const ChannelPage = () => {
  const { profile, loading, error } = useSelector((state) => state.channel);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    // wrap your async call here
    const loadData = async () => {
      dispatch(getChannelInfo(id));
    };
    // then call it here
    loadData();
  }, [id, dispatch]);

  if (error) return <PageNotFound />;

  return (
    <>
      <Title title={`${profile?.name} | UA You video sharing website`} />
      <ChannelInfo profile={profile} />
      <Routes>
        <Route path="" element={<HomePage name={profile?.description} />} />
        <Route path="videos" element={<VideoPage />} />
        <Route
          path="descriptions"
          element={<DescriptionPage email={profile?.email} descriptions={profile?.description} />}
        />
      </Routes>
      {loading && <Loading />}
    </>
  );
};

export default ChannelPage;
