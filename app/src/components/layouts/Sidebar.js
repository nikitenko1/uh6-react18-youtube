import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { getChannelSubsrciptionApi } from "../../api/channelApi";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { VscFlame } from "react-icons/vsc";
import { MdVideoSettings } from "react-icons/md";
import { BiMoviePlay, BiHistory } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { logOut } from "../../redux/slice/authSlice";
import ChannelItem from "../channel/ChannelItem";
import { v4 } from "uuid";
import { toast } from "react-toastify";

const Sidebar = ({ setShowMenu }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [subChannel, setSubChannel] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      try {
        const res = await getChannelSubsrciptionApi();
        if (res.data.success) {
          setSubChannel(res.data.subscription);
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);

  return (
    <ul className="pt-5 h-[calc(100vh-65px)] overflow-auto scroll-none pl-4">
      <li>
        <NavLink
          activeclassname="active"
          to="/"
          className="flex items-center text-white p-2 text-[16px]"
        >
          <AiOutlineHome className="text-[20px] mr-3" /> Home page
        </NavLink>
      </li>
      <li>
        <NavLink
          activeclassname="active"
          to="/trending"
          className="flex items-center text-white p-2 text-[16px]"
        >
          <VscFlame className="text-[20px] mr-3" /> Popular
        </NavLink>
      </li>
      <li>
        <NavLink
          activeclassname="active"
          to="/subscriptions"
          className="text-white p-2 text-[16px] flex items-center"
        >
          <MdVideoSettings className="text-[20px] mr-3" /> Subscriptions
        </NavLink>
      </li>
      <div className="w-full h-[1px] bg-[#ccc] my-4 opacity-10"></div>
      <li>
        <NavLink
          activeclassname="active"
          to="/favourites"
          className="text-white p-2 text-[16px] flex items-center"
        >
          <BiMoviePlay className="text-[20px] mr-3" />
          Favourite videos
        </NavLink>
      </li>
      <li>
        <NavLink
          activeclassname="active"
          to="/history"
          className="text-white p-2 text-[16px] flex items-center"
        >
          <BiHistory className="text-[20px] mr-3" /> Videos watched
        </NavLink>
      </li>
      <li>
        <NavLink
          activeclassname="active"
          to="/liked-video"
          className="text-white p-2 text-[16px] flex items-center"
        >
          <AiFillLike className="text-[20px] mr-3" /> Videos liked
        </NavLink>
      </li>
      {currentUser && (
        <>
          <div className="w-full h-[1px] bg-[#ccc] my-4 opacity-10"></div>
          <li
            onClick={() => {
              dispatch(logOut());
            }}
          >
            <button className="text-white p-2 text-[16px] flex items-center">
              <AiOutlineLogout className="text-[20px] mr-3" /> Log out
            </button>
          </li>
          <div className="w-full h-[1px] bg-[#ccc] my-4 opacity-10"></div>

          {subChannel.length > 0 && (
            <div className="text-white p-2 text-[16px]">
              <h1>Subscribe channel</h1>
              <div className="mt-4">
                {subChannel.map((p) => (
                  <ChannelItem key={v4()} data={p} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </ul>
  );
};

export default Sidebar;
