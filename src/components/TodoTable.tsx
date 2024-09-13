"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { TodoType } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  DeleteTodo,
  FetchAllTodos,
  UpdateTodoInformations,
} from "@/redux/features/todo";
import CustomPagination from "./CustomPagination";

const TodoTable = () => {
  const { user } = useSelector((state: RootState) => state.loginUser);
  const {
    todos: { todos, total },
    loading,
    error,
  } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [isEdit, setIsEdit] = useState({ isEdit: false, id: 0 });

  useEffect(() => {
    dispatch(
      FetchAllTodos({
        userId: user.id,
        limit: 30,
        skip: (currentPage - 1) * 30,
      })
    );
  }, [currentPage]);

  const handleDelete = (id: number) => {
    try {
      if (id === 255) {
        toast.error(
          "You don't update it because it is not coming from the dummy json server"
        );
      } else {
        dispatch(DeleteTodo(id));
      }
    } catch (error) {
      toast.error("Error deleting todo");
    }
  };

  const handleEdit = (todo: TodoType) => {
    if (todo.id === 255) {
      toast.error(
        "You don't update it because it is not coming from the dummy json server"
      );
    } else {
      setIsEdit({ isEdit: true, id: todo.id });
      setText(todo.todo);
      setStatus(todo.completed);
    }
  };

  const handleSaveChanges = () => {
    if (text.trim() !== "") {
      dispatch(
        UpdateTodoInformations({ id: isEdit.id, todo: text, completed: status })
      );
      setIsEdit({ isEdit: false, id: 0 });
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <div className=" space-y-10">
      <Table className=" mt-5">
        <TableHeader>
          <TableRow className=" border-b border-b-gray-700">
            <TableHead className=" text-white">Text</TableHead>
            <TableHead className=" text-white w-28">Status</TableHead>
            <TableHead className="text-right text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo, indx) => (
            <TableRow
              key={indx}
              className=" border-b border-b-gray-700 cursor-pointer hover:bg-[#171717]"
            >
              <TableCell>
                {todo.id === isEdit.id && isEdit.isEdit ? (
                  <Input
                    autoFocus
                    className=" border border-gray-600"
                    placeholder="Edit todo..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                ) : (
                  todo.todo
                )}
              </TableCell>
              <TableCell>
                {todo.id === isEdit.id && isEdit.isEdit ? (
                  <Select
                    onValueChange={(value) => setStatus(Boolean(value))}
                    defaultValue={String(status)}
                  >
                    <SelectTrigger className="w-[180px] border border-gray-700">
                      <SelectValue placeholder="Select the status" />
                    </SelectTrigger>
                    <SelectContent className=" bg-black text-white border border-gray-700">
                      <SelectGroup>
                        <SelectItem className="cursor-pointer" value="false">
                          Todo
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="true">
                          Completed
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className=" bg-green-600/40 w-20 capitalize rounded-md p-1 text-center">
                    {todo.completed ? "Completed" : "Todo"}
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right">
                {todo.id === isEdit.id && isEdit.isEdit ? (
                  <Button
                    onClick={handleSaveChanges}
                    className=" bg-green-500 hover:bg-green-600"
                  >
                    Save Changes
                  </Button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(todo)} className=" mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-orange-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                    <button onClick={() => handleDelete(todo.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-red-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomPagination
        totalPosts={total}
        postsPerPage={30}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TodoTable;
