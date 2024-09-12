"use client";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { FetchPostById } from "@/redux/features/posts";
import { useParams } from "next/navigation";
import { FaRegEye } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import PostComments from "@/components/PostComments";

const PostDetail = () => {
  const { post, loading, error } = useSelector(
    (state: RootState) => state.posts
  );
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  useEffect(() => {
    dispatch(FetchPostById(+params.id));
  }, []);

  console.log(post);

  if (loading) {
    return (
      <div className=" w-full h-96 bg-slate-700 animate-pulse mt-10 rounded-md"></div>
    );
  }

  return (
    <div>
      <div className=" py-8 md:py-16 bg-[#171717] antialiased mt-10 rounded-md px-7 md:px-16 space-y-7">
        <h1 className=" text-3xl font-semibold">{post?.title}</h1>
        <div className=" flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className=" flex items-center gap-2">
            {post?.tags?.map((tag) => (
              <p key={tag} className=" px-4 py-1 bg-[#202020] rounded-md"># {tag}</p>
            ))}
          </div>

          <div className=" flex items-center gap-5">
            <p className=" flex items-center gap-2">
              <FaRegEye />
              {post?.views}
            </p>
            <p className=" flex items-center gap-2">
              <AiFillLike />
              {post?.reactions?.likes}
            </p>
            <p className=" flex items-center gap-2">
              <AiFillDislike />
              {post?.reactions?.dislikes}
            </p>
          </div>
        </div>
        <p className="text-slate-400">{post?.body}</p>
      </div>
      <PostComments id={post.id} />
    </div>
  );
};

export default PostDetail;
