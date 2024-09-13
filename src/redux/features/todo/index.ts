import axiosClient from "@/lib/axios";
import { Filters, TodoType } from "@/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  todos: {
    todos: TodoType[];
    total: number;
    skip: number;
    limit: number;
  };
  loading: boolean;
  error: null | undefined | string;
}

const initialState: InitialStateType = {
  todos: {
    todos: [],
    total: 0,
    skip: 0,
    limit: 0,
  },
  loading: false,
  error: null,
};

// Asyncthunk for getting all todos
export const FetchAllTodos = createAsyncThunk(
  "fetchAllTodos",
  async (params?: Filters) => {
    const response = await axiosClient.get(`/todos/user/${params?.userId}`, {
      params,
    });

    return response.data;
  }
);

// Asyncthunk for creating todos
export const CreateTodo = createAsyncThunk(
  "createTodo",
  async ({ userId, todo }: { userId: number; todo: string }) => {
    const response = await axiosClient.post("/todos/add", {
      userId,
      todo,
      completed: false,
    });

    return response.data;
  }
);

// Asyncthunk for updating the todo
export const UpdateTodoInformations = createAsyncThunk(
  "updateTodoInformations",
  async ({
    id,
    todo,
    completed,
  }: {
    id: number;
    todo: string;
    completed: boolean;
  }) => {
    const response = await axiosClient.patch(`/todos/${id}`, {
      todo,
      completed,
    });

    return response.data;
  }
);

// Asyncthunk for creating todos
export const DeleteTodo = createAsyncThunk("DeleteTodo", async (id: number) => {
  const response = await axiosClient.delete(`/todos/${id}`);

  return response.data;
});

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(FetchAllTodos.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchAllTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(FetchAllTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(CreateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateTodo.fulfilled, (state, action) => {
        state.todos.todos = [...state.todos.todos, action.payload];
        state.loading = false;
        state.error = null;
      })
      .addCase(CreateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(UpdateTodoInformations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateTodoInformations.fulfilled, (state, action) => {
        const index = state.todos.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos.todos[index] = {
            ...state.todos.todos[index],
            ...action.payload,
          };
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(UpdateTodoInformations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(DeleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteTodo.fulfilled, (state, action) => {
        state.todos.todos = state.todos.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(DeleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default todosSlice.reducer;
