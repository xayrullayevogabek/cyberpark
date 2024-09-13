import { configureStore } from "@reduxjs/toolkit";
import LoginUser from "./features/login";
import products from "./features/products";
import posts from "./features/posts";
import postComments from "./features/post-comments";
import todos from "./features/todo";

export const store = configureStore({
  reducer: {
    loginUser: LoginUser,
    products,
    posts,
    postComments,
    todos
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
