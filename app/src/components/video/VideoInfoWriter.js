import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSubscription,
  getSubscription,
  setSubscriptions,
  subscriptionChannel,
  unSubscription,
} from "../../redux/slice/subscriptionSlice";
import ModalAuth from "../modal/ModalAuth";
import VideoDesc from "./VideoDesc";
import PageNotFound from "../../pages/PageNotFound";
import { Link } from "react-router-dom";

const VideoInfoWriter = ({ video }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const { subscriptionCount, isSubscription, error, isCheck } = useSelector((state) => state.sub);
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    // wrap your async call here
    const loadData = async () => {
      dispatch(getSubscription(video?.writer?._id));
    };

    if (!video?.writer?._id) return;
    // then call it here
    loadData();
  }, [video?.writer?._id, dispatch]);

  const handleSubscription = () => {
    if (!currentUser) return setShow(true);
    if (isSubscription) {
      if (window.confirm("You want to unsubscribe!")) {
        dispatch(unSubscription(video?.writer?._id));
      }
    } else {
      dispatch(subscriptionChannel({ channelId: video?.writer?._id }));
    }
  };

  if (error) return <PageNotFound />;

  return (
    <div className="border-t border-[#999] mt-2 border-b pb-4">
      <div className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to={`/channel/${video?.writer?._id}`}
              className="w-[50px] h-[50px] rounded-full overflow-hidden block"
            >
              <img className="w-full h-full object-cover" src={video?.writer?.avatar} alt="img" />
            </Link>
            <div className="ml-4">
              <Link
                to={`/channel/${video?.writer?._id}`}
                className="font-semibold text-sm mb-2 block"
              >
                {video?.writer?.name}
              </Link>
              <p className="text-gray-300 text-xs">{subscriptionCount} subscribers</p>
            </div>
          </div>
          {currentUser?._id !== video?.writer?._id && (
            <>
              <button
                className={`py-2 text-sm px-6 ${
                  isSubscription ? "bg-[#ffffff1a] text-white" : "bg-[#f1f1f1] text-black"
                } rounded-full ${isCheck ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={handleSubscription}
                disabled={isCheck}
              >
                {isSubscription ? "Registered" : "Register"}
              </button>
            </>
          )}
        </div>
      </div>

      <VideoDesc description={video?.description} />

      {show && <ModalAuth setShow={setShow} />}
    </div>
  );
};

export default VideoInfoWriter;
