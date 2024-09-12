import axiosClient from "@/lib/axios";
import { Product, ProductFilters } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface InitialStateType {
  products: {
    skip: number;
    limit: number;
    total: number;
    products: Product[];
  };
  loading: boolean;
  error: null | undefined | string;
}

const initialState: InitialStateType = {
  products: {
    products: [],
    skip: 0,
    limit: 0,
    total: 0,
  },
  loading: false,
  error: null,
};

// Asyncthunk for getting all products
export const FetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async (params?: ProductFilters) => {
    const response = await axiosClient.get("/products", { params });

    console.log("eww",response)

    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(FetchAllProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(FetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(FetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
