import React, { useState } from "react";
import { toast } from "react-toastify";
import { deleteCommentApi } from "../../api/commentApi";
import { calculateCreatedTime } from "../../utils/formatDate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { parseLinkDescription } from "../../utils/parseLinkDescription";

const CommentItem = ({ data, deleteComment }) => {
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.auth);

  const handleDeleteComment = async (id) => {
    if (window.confirm("Are you sure you want to delete the comment!")) {
      setLoading(true);
      const res = await deleteCommentApi(id);
      if (res.data.success) {
        deleteComment(id);
        toast.success("Comment deleted successfully!");
        setLoading(false);
      } else {
        toast.error("Delete comment failed!");
        setLoading(false);
      }
    }
  };
  return (
    <div className="flex items-center mb-4 rounded-md">
      <Link
        className="w-[40px] h-[40px] rounded-full overflow-hidden"
        to={`/channel/${data?.userId?._id}`}
      >
        <img alt="img" className="w-full h-full object-cover" src={data?.userId?.avatar} />
      </Link>
      <div className="flex-1 ml-2 overflow-hidden flex items-center justify-between bg-[#242526] py-2 px-3 rounded-md">
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center text-xs text-[#999]">
            <p className="text-white font-bold">{data?.userId?.name}</p>
            <p className="ml-2">{calculateCreatedTime(data?.createdAt)}</p>
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: parseLinkDescription(data?.content),
            }}
            className="text-sm font-normal mt-2"
          />
        </div>

        {currentUser?._id === data?.userId?._id && (
          <button
            disabled={loading}
            onClick={() => handleDeleteComment(data?._id)}
            className={`py-1 px-2 text-xs rounded-md hover:scale-150 transition-all hover:text-red-700 ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
