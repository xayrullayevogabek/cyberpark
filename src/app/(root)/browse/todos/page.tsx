import React from "react";
import TodoTable from "@/components/TodoTable";
import DialogCreateTodo from "@/components/DialogCreateTodo";

const Todos = () => {
  return (
    <div className="flex flex-col gap-8 py-10">
      <header className=" flex items-center justify-between">
        <h1 className=" text-3xl font-semibold">Todos</h1>
        <DialogCreateTodo />
      </header>
      <TodoTable />
    </div>
  );
};

export default Todos;
