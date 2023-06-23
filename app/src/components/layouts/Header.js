import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { SlMagnifierRemove } from "react-icons/sl";
import NavbarUser from "./NavbarUser";
import NavLogin from "./NavLogin";
import { useSearchParams } from "../../hooks/useSearchParms";

const Header = ({ setShowMenu }) => {
  const { currentUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const [text, setText] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    window.addEventListener("click", () => setShowSearch(false));
    return () => {
      window.removeEventListener("click", () => setShowSearch(false));
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
  };

  return (
    <div
      className="flex justify-between items-center text-white py-2 relative px-4 lg:bg-transparent
     bg-[#333]"
    >
      <div className="flex items-center justify-center">
        <BiMenuAltLeft
          onClick={() => setShowMenu(true)}
          className="text-[25px] lg:hidden cursor-pointer"
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          navigate(`/search?type=${searchParams.get("type") || "video"}&q=${text}`);
          setShowSearch(false);
        }}
        onClick={(e) => e.stopPropagation()}
        className={`items-center md:rounded-full overflow-hidden justify-center w-[500px] ${
          showSearch ? "top-0 shadow-md" : "top-[-100px]"
        } fixed max-w-full left-0 flex md:static transition-all z-[9999]`}
      >
        {showSearch && (
          <div
            onClick={() => setShowSearch(false)}
            className="md:hidden overlay-search block fixed left-0 right-0 bottom-0 top-[44px] bg-[#00000099]"
          />
        )}
        <input
          value={text}
          className="text-white bg-[#222] flex-1 outline-none py-1 pl-4 h-[44px] md:h-[30px]"
          type="text"
          placeholder="Search ..."
          onChange={(e) => handleChange(e)}
        />
        <button className="px-3 bg-[#bc13fe] w-[45px] md:h-[30px] h-[44px] flex items-center">
          <AiOutlineSearch className="text-xl" />
        </button>
      </form>

      <div className="flex items-center">
        <div
          className="flex items-center justify-center mr-4 md:hidden cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShowSearch(!showSearch);
          }}
        >
          {showSearch ? (
            <SlMagnifierRemove className="text-xl text-[25px] text-white" />
          ) : (
            <AiOutlineSearch className="text-xl text-[25px]" />
          )}
        </div>

        {currentUser ? <NavbarUser user={currentUser} /> : <NavLogin />}
      </div>
    </div>
  );
};

export default Header;
