import { configureStore } from "@reduxjs/toolkit";
import LoginUser from "./features/login";
import products from "./features/products";

export const store = configureStore({
  reducer: {
    loginUser: LoginUser,
    products,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
