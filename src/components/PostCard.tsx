import React from "react";
import Link from "next/link";
import { Post } from "@/types";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Link
      href={`/browse/posts/${post.id}`}
      className="block max-w-sm p-6 rounded-lg shadow bg-[#171717] hover:scale-105 transition-all duration-200"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white line-clamp-2">
        {post.title}
      </h5>
      <p className="font-normal text-gray-400 line-clamp-3">{post.body}</p>
    </Link>
  );
};

export default PostCard;
