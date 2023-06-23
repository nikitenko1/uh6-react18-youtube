import React from "react";
import CommentItem from "./CommentItem";
import { v4 } from "uuid";

const CommentList = ({ commentList, deleteComment }) => {
  return (
    <div className={`mt-5 h-auto rounded-md`}>
      <h3 className="mb-4">Comments</h3>
      {commentList.length > 0 ? (
        commentList.map((p) => <CommentItem key={v4()} data={p} deleteComment={deleteComment} />)
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <h1>There are no recent comments!</h1>
        </div>
      )}
    </div>
  );
};

export default CommentList;
