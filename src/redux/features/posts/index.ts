import axiosClient from "@/lib/axios";
import { Filters, Post } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface InitialStateType {
  posts: {
    skip: number;
    limit: number;
    total: number;
    posts: Post[];
  };
  post: Post;
  loading: boolean;
  error: null | undefined | string;
}

const initialState: InitialStateType = {
  posts: {
    posts: [],
    skip: 0,
    limit: 0,
    total: 0,
  },
  post: {} as Post,
  loading: false,
  error: null,
};

// Asyncthunk for getting all posts
export const FetchAllPosts = createAsyncThunk(
  "fetchAllPosts",
  async (params: Filters) => {
    const response = await axiosClient.get("/posts", { params });

    return response.data;
  }
);

// Asyncthunk for getting post by id
export const FetchPostById = createAsyncThunk(
  "fetchPostById",
  async (id: number) => {
    const response = await axiosClient.get(`/posts/${id}`);

    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(FetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(FetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(FetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.post = action.payload;
      })
      .addCase(FetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
