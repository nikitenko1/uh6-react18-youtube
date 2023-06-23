import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUpload } from "react-icons/ai";

const NavbarUser = ({ user }) => {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    window.addEventListener("click", () => setShowNav(false));
    return () => {
      window.removeEventListener("click", () => setShowNav(false));
    };
  }, []);
  return (
    <div className="flex items-center relative" onClick={(e) => e.stopPropagation()}>
      <Link className="flex items-center" to="/upload">
        <AiOutlineUpload className="text-[25px] mr-4" />
      </Link>
      <div
        className="w-[25px] h-[25px] rounded-full overflow-hidden cursor-pointer"
        onClick={() => setShowNav(!showNav)}
      >
        <img className="w-full h-full" src={user?.avatar} alt="abc" />
        {showNav && (
          <ul className="absolute right-0 bg-[#333] nav-user-list rounded-md overflow-hidden z-[1000]">
            <li className="py-2 px-3 border-b">{user.name}</li>
            <li className="py-2 px-3 border-b">{user.email}</li>
            <li className="py-2 px-3 border-b">
              <Link to={`/channel/${user._id}`}>Channel manager</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavbarUser;
