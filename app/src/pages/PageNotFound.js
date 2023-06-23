import React from "react";
import { Link } from "react-router-dom";
import Title from "../components/shared/Title";

const PageNotFound = () => {
  return (
    <div className="bg-[#222] h-full flex items-center justify-center">
      <Title title={"404 Page"} />
      <div className="error">
        <div className="error-body container">
          <h1 className="error-title">Oops!</h1>
          <Link to="/">
            <p className="border-[#bc13fe] hover:border-b-2 transition-all">Go to HomePage</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
