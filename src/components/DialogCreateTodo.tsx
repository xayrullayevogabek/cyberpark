"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateTodoValidation } from "@/lib/validations";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { CreateTodo } from "@/redux/features/todo";

const DialogCreateTodo = () => {
  const { user } = useSelector((state: RootState) => state.loginUser);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<z.infer<typeof CreateTodoValidation>>({
    resolver: zodResolver(CreateTodoValidation),
    defaultValues: {
      todo: "",
    },
  });

  const onSubmit = ({ todo }: z.infer<typeof CreateTodoValidation>) => {
    dispatch(CreateTodo({ userId: user.id, todo }));
    form.reset();
    setIsOpen(false)
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-[#202020] bg-[#171717] hover:text-white border-none"
        >
          Create Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#171717] border-none">
        <DialogHeader>
          <DialogTitle>Create Todo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="todo"
            placeholder="Enter any text here"
            label="Write Todo"
          />
        </Form>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className=" bg-black/70 text-white hover:bg-black"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateTodo;
