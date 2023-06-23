import React from "react";
import { Link, useLocation } from "react-router-dom";
import Overlay from "./Overlay";

const ModalAuth = ({ setShow }) => {
  const location = useLocation();

  return (
    <Overlay setShow={setShow}>
      <div className="w-[400px] max-w-[calc(100%-32px)] bg-[#222] flex items-center flex-col p-4 rounded-md modal-animation">
        <h3 className="mb-4 text-center text-white text-[25px] font-semibold">UA You</h3>
        <Link
          onClick={(e) => e.stopPropagation()}
          to={`/sign-in?redirect=${encodeURIComponent(location.pathname)}`}
          className="py-2 px-10 text-center bg-red-500 rounded-md hover:bg-red-700 transition-all block"
        >
          Log in now
        </Link>
        <p>
          <p className="mt-4 text-right text-[14px]">
            If you don't have an account please{" "}
            <Link
              className="text-blue-500"
              to={`/sign-up?redirect=${encodeURIComponent(location.pathname)}`}
            >
              <p className="border-[#bc13fe] hover:border-b-2 inline-block">Register</p>
            </Link>
          </p>
        </p>
      </div>
    </Overlay>
  );
};

export default ModalAuth;
