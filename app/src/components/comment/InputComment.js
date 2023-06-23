import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { postCommentApi } from "../../api/commentApi";
import { toast } from "react-toastify";

const InputComment = ({ addComment }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handlePostComment = async (e, newComment) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);

    try {
      const res = await postCommentApi(newComment);
      if (res.data.success) {
        addComment(res.data.comment);
      }
      setText("");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4 mt-4">
      {currentUser ? (
        <form
          onSubmit={(e) =>
            handlePostComment(e, {
              videoId: id,
              userId: currentUser._id,
              content: text,
            })
          }
          className="relative flex items-center overflow-hidden rounded-[200px] border-gray-600 border"
        >
          <img
            alt="img"
            src={currentUser?.avatar}
            className="w-[30px] h-[30px] rounded-full absolute left-[5px]"
          />
          <input
            type="text"
            className="py-2 pl-12 flex-1 w-full bg-transparent outline-none text-[14px] placeholder:text-[14px]"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Your opinion about the video..."
          />
          <button
            disabled={loading}
            className={`text-[14px] py-2 px-5 text-white ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? "Sending" : "Send"}
          </button>
        </form>
      ) : (
        <div
          className="py-2 w-full bg-transparent border-gray-600 border rounded-[200px] relative 
        flex items-center px-12"
        >
          <img
            alt="img"
            src={"/auth.jpg"}
            className="w-[30px] h-[30px] rounded-full absolute left-[5px]"
          />
          <h1 className="text-[14px]">
            Need{" "}
            <Link
              className="text-blue-500"
              to={`/sign-in?redirect=${encodeURIComponent(location.pathname)}`}
            >
              log in
            </Link>{" "}
            to comment!
          </h1>
        </div>
      )}
    </div>
  );
};

export default InputComment;
