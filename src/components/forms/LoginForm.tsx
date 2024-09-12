"use client";
import { LoginFormValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { LoginUser } from "@/redux/features/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async ({
    username,
    password,
  }: z.infer<typeof LoginFormValidation>) => {
    try {
      await dispatch(LoginUser({ username, password })).unwrap();

      router.push("/");
    } catch (error) {
      toast.error("Login or Password is invalid");
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomFormField
          control={form.control}
          name="username"
          fieldType={FormFieldType.INPUT}
          label="Enter your username"
          placeholder="Ex: John Doe"
        />

        <CustomFormField
          control={form.control}
          name="password"
          fieldType={FormFieldType.INPUT}
          label="Enter your password"
          placeholder="Password"
        />
        <Button className=" bg-red-700 w-full hover:bg-red-800" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
