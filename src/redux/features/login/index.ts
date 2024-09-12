import axiosClient from "@/lib/axios";
import { getItem, setItem } from "@/lib/utils";
import { User } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import nookies from "nookies";

interface InitialStateType {
  loading: boolean;
  error: null | undefined | string;
  user: User;
}

const initialState: InitialStateType = {
  loading: false,
  error: null,
  user: getItem("user") || ({} as User),
};

// Asyncthunk for login user
export const LoginUser = createAsyncThunk(
  "loginUser",
  async ({ username, password }: { username: string; password: string }) => {
    const login = await axiosClient.post("/auth/login", {
      username,
      password,
    });

    const token = login.data.token;
    const refresh = login.data.refreshToken;

    nookies.set(null, "access", token, {
      path: "/",
    });
    nookies.set(null, "refresh", refresh, { path: "/" });

    const currentUser = await axiosClient.get("auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setItem("user", currentUser.data);

    return currentUser.data;
  }
);

const LoginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(LoginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default LoginSlice.reducer;
