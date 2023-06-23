import React from "react";

const DescriptionPage = ({ descriptions, email }) => {
  return (
    <div className="text-white p-4">
      <p className="font-semibold">Describe:</p>
      <p>{descriptions}</p>
      <p className="font-semibold mt-5">Contact: </p>
      <p>Email: UAYou@gmail.com</p>
      {/* <p>Email: {email}</p> */}
    </div>
  );
};

export default DescriptionPage;
