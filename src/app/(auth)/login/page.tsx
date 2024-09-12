import React from "react";
import LoginForm from "@/components/forms/LoginForm";

const Login = () => {
  return (
    <div className="flex px-2 md:px-20 lg:px-0 justify-center items-center h-screen w-full">
      <div className=" bg-[#171717] w-full lg:w-[25vw] max-w-4xl p-5 rounded-lg">
        <h1 className=" text-center mb-5 text-2xl font-semibold">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
