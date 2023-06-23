import React from "react";
import { Link } from "react-router-dom";

const NavLogin = () => {
  return (
    <div className="flex items-center">
      <Link to="/sign-in" className="py-1 px-4 bg-[#bc13fe] rounded-full">
        Log in
      </Link>
    </div>
  );
};

export default NavLogin;
