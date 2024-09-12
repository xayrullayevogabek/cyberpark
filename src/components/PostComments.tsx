"use client";
import { FetchCommentsByPostId } from "@/redux/features/post-comments";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PostComments = ({ id }: { id: number }) => {
  const { comments, loading, error } = useSelector(
    (state: RootState) => state.postComments
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(FetchCommentsByPostId(id));
  }, [id]);

  return (
    <div className=" mt-10 bg-[#171717] px-7 md:px-16 md:py-16 py-7 rounded-md">
      <h1 className=" text-2xl mb-5">Comments</h1>
      <div className=" space-y-2">
        {comments?.comments?.map((comment) => (
          <div key={comment.id} className=" bg-[#202020] p-3 rounded-md">
            <h1 className=" text-2xl">{comment.user.fullName}</h1>
            <p className=" mt-3 text-slate-400">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostComments;
