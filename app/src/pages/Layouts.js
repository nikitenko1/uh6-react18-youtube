import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Home";
import FavouritePage from "./Favourite";
import TrendingPage from "./Trending";
import SubscriptionPage from "./Subscription";
import HistoryVideoPage from "./HistoryVideo";
import LikeVideoPage from "./LikeVideo";
import ChannelPage from "./channel";
import UploadPage from "./UploadPage";
import DetailsVideo from "./DetailsVideo";
import SearchResults from "./SearchResults";
import PageNotFound from "./PageNotFound";
import Logo from "../components/layouts/Logo";
import Sidebar from "../components/layouts/Sidebar";
import Header from "../components/layouts/Header";
import Overlay from "../components/modal/Overlay";

const Layouts = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex">
      <div
        className={`w-[216px] pt-[5px] max-w-full mr-5 lg:block fixed lg:static top-0 bottom-0 bg-[#181818] 
        lg:bg-transparent lg:pr-0 pr-4 z-[1000] ${
          showMenu ? "left-0 z-[99999]" : "left-[-100%]"
        } transition-all`}
      >
        <Logo setShowMenu={setShowMenu} />
        <Sidebar setShowMenu={setShowMenu} />
      </div>
      {showMenu && <Overlay setShow={setShowMenu} />}
      <div className="flex-1 h-screen max-w-full">
        <Header setShowMenu={setShowMenu} />
        <div className="pt-3 px-4">
          <div className="h-[calc(100vh-79px)] overflow-auto scroll-none">
            <Routes>
              <Route path="" element={<HomePage />} />
              <Route path="trending" element={<TrendingPage />} />
              <Route path="subscriptions" element={<SubscriptionPage />} />
              <Route path="favourites" element={<FavouritePage />} />
              <Route path="history" element={<HistoryVideoPage />} />
              <Route path="liked-video" element={<LikeVideoPage />} />
              <Route path="channel/:id/*" element={<ChannelPage />} />
              <Route path="upload" element={<UploadPage />} />
              <Route path="details/:id" element={<DetailsVideo />} />
              <Route path="search" element={<SearchResults />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layouts;
