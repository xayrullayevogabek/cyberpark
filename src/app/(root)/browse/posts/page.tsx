"use client";
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "@/components/PostCard";
import CustomPagination from "@/components/CustomPagination";
import { FetchAllPosts } from "@/redux/features/posts";
import OrderSelect from "@/components/OrderSelect";

const Posts = () => {
  const [order, setOrder] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { loading, error, posts } = useSelector(
    (state: RootState) => state.posts
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      FetchAllPosts({
        limit: 30,
        skip: (currentPage - 1) * 30,
        sortBy: order ? "title" : "",
        order,
      })
    );
  }, [currentPage, order]);

  return (
    <div className=" flex flex-col gap-8 py-10">
      <header className=" flex items-center justify-between">
        <div className=" flex items-center gap-10">
          <h1 className=" text-3xl font-semibold">Posts</h1>
        </div>
        <OrderSelect order={order} setOrder={setOrder} />
      </header>
      <div className=" grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 30 }).map((_, indx) => (
              <div
                key={indx}
                className=" bg-slate-800 animate-pulse w-full h-52 rounded-md"
              ></div>
            ))
          : posts.posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
      <CustomPagination
        totalPosts={posts.total}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        postsPerPage={30}
      />
    </div>
  );
};

export default Posts;
