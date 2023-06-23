import React from "react";

const NoResults = () => {
  return (
    <div className="flex justify-center items-center full-height w-full">
      <img
        className="w-[564px] h-[288] object-cover"
        src={"https://res.cloudinary.com/dvpy1nsjp/image/upload/v1687340615/no-results-found.jpg"}
        alt="img"
      />
    </div>
  );
};

export default NoResults;
