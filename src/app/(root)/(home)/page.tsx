"use client";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import nookies from "nookies";
import { redirect } from "next/navigation";

export default function Home() {
  const { user } = useSelector((state: RootState) => state.loginUser);
  const { refresh, access } = nookies.get();

  if (user && refresh && access) {
    return redirect("/browse");
  } else {
    return redirect("/login");
  }
}
