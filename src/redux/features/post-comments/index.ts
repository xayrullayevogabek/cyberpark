import axiosClient from "@/lib/axios";
import { Comment } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface InitialStateType {
  loading: boolean;
  error: null | undefined | string;
  comments: {
    skip: number;
    limit: number;
    total: number;
    comments: Comment[];
  };
}

const initialState: InitialStateType = {
  loading: false,
  error: null,
  comments: {
    skip: 0,
    limit: 0,
    total: 0,
    comments: [],
  },
};

// Asyncthunk for getting comment by post id
export const FetchCommentsByPostId = createAsyncThunk(
  "fetchCommentsByPostId",
  async (id: number) => {
    const response = await axiosClient.get(`/posts/${id}/comments`);

    return response.data;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(FetchCommentsByPostId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchCommentsByPostId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.comments = action.payload;
      })
      .addCase(FetchCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default commentsSlice.reducer;
