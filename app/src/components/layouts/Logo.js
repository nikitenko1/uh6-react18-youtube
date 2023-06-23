import React from "react";
import { Link } from "react-router-dom";
import { TiSocialYoutube } from "react-icons/ti";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const Logo = ({ setShowMenu }) => {
  return (
    <div className="py-1 text-white pl-4">
      <div className="flex items-center justify-between">
        <Link className="flex items-center text-[20px] font-semibold" to="/">
          <TiSocialYoutube className="text-4xl text-red-500 mr-2 rounded" />
          UA You
        </Link>
        <div
          onClick={() => setShowMenu(false)}
          className="flex items-center justify-center lg:hidden"
        >
          <IoMdRemoveCircleOutline className="text-[25px]" />
        </div>
      </div>
    </div>
  );
};

export default Logo;
