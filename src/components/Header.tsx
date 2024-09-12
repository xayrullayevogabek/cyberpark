"use client";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname } from "next/navigation";

const navigations = [
  {
    title: "Products",
    href: "/browse/products",
  },
  {
    title: "Posts",
    href: "/browse/posts",
  },
  {
    title: "Todos",
    href: "/browse/todos",
  },
];

const Header = () => {
  const pathname = usePathname();
  const { user } = useSelector((state: RootState) => state.loginUser);

  return (
    <div className=" w-full py-5 px-2 sm:px-2  md:px-4 lg:px-10 xl:px-28 bg-[#171717]">
      <div className="flex items-center justify-between">
        <h1 className=" text-xl">Logo</h1>
        <nav className=" flex items-center">
          {navigations.map((nav, indx) => (
            <Link
              key={indx}
              href={nav.href}
              className={` p-3 rounded-lg hover:text-slate-400 transition-all duration-200 ${
                pathname === nav.href && "bg-black"
              }`}
            >
              {nav.title}
            </Link>
          ))}
        </nav>
        <div className=" flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user?.image} alt={user.firstName} />
            <AvatarFallback>
              {user?.firstName?.slice(0, 1)}
              {user.lastName.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <span className=" cursor-pointer">
            {user?.firstName} {user?.lastName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
