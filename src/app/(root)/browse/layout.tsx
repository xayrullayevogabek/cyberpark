import Header from "@/components/Header";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main>
      <Header />
      <section className=" px-1 sm:px-2  md:px-4 lg:px-10 xl:px-28 pb-10">
        {children}
      </section>
    </main>
  );
};

export default Layout;
