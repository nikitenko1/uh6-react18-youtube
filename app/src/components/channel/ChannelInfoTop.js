import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  checkSubscription,
  getSubscription,
  setSubscriptions,
  subscriptionChannel,
  unSubscription,
} from "../../redux/slice/subscriptionSlice";
import ModalUpdateUser from "../modal/ModalUpdateUser";
import ModalAuth from "../modal/ModalAuth";

const ChannelInfoTop = ({ profile }) => {
  const { currentUser } = useSelector((state) => state.auth);

  const { isSubscription, subscriptionCount, isCheck } = useSelector((state) => state.sub);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showModalAuth, setShowModalAuth] = useState(false);

  const { id } = useParams();

  const handleSubscription = () => {
    if (!currentUser) return setShowModalAuth(true);
    if (isSubscription) {
      if (window.confirm("You want to unsubscribe!")) {
        dispatch(unSubscription(profile?._id));
      }
    } else {
      dispatch(subscriptionChannel({ channelId: profile?._id }));
    }
  };

  useEffect(() => {
    if (!currentUser) return dispatch(setSubscriptions(false));
    if (currentUser._id === profile?._id) return;
    if (!profile?._id) return;
    dispatch(checkSubscription(profile?._id));
  }, [id, currentUser, profile?._id, dispatch]);

  useEffect(() => {
    if (!profile?._id) return;
    dispatch(getSubscription(profile?._id));
  }, [profile?._id, dispatch]);

  return (
    <div className="bg-[#222]">
      <div className="p-4">
        <div className="flex items-center justify-between md:flex-row flex-col">
          <div className="flex items-center md:flex-row flex-col">
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
              <img className="w-full h-full object-cover" src={profile?.avatar} alt={"avatar"} />
            </div>
            <div className="md:ml-4 ml-0 md:mt-0 mt-3 text-center lg:text-left">
              <p>{profile?.name}</p>
              <p className="text-[#999] text-sm">{subscriptionCount} subscribers</p>
            </div>
          </div>
          {currentUser?._id !== profile?._id ? (
            <button
              disabled={isCheck}
              onClick={handleSubscription}
              className={`mt-3 md:mt-0 py-2 px-3 ${
                isSubscription ? "bg-[#ffffff1a]" : "bg-red-500"
              } rounded-sm ${isCheck ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isSubscription ? "Registered" : "Register"}
            </button>
          ) : (
            <div className="flex">
              <button
                onClick={() => setShow(true)}
                className="mt-3 md:mt-0 py-2 px-3 rounded-sm bg-blue-500 mr-4 hover:bg-blue-700
                transition-all"
              >
                Channel customization
              </button>
              <Link
                to="videos"
                className="mt-3 md:mt-0 py-2 px-3 rounded-sm bg-blue-500 block hover:bg-blue-700
                transition-all"
              >
                Video management
              </Link>
            </div>
          )}
        </div>
        {show && <ModalUpdateUser setShow={setShow} />}
        {showModalAuth && <ModalAuth setShow={setShowModalAuth} />}
      </div>
    </div>
  );
};

export default ChannelInfoTop;
