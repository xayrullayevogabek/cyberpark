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
  product: Product;
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
  product: {} as Product,
  loading: false,
  error: null,
};

// Asyncthunk for getting all products
export const FetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async (params?: ProductFilters) => {
    const response = await axiosClient.get("/products", { params });

    return response.data;
  }
);

// Asyncthunk for getting product by id
export const FetchProductById = createAsyncThunk(
  "fetchProductById",
  async (id: number) => {
    const response = await axiosClient.get(`/products/${id}`);

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
      })
      .addCase(FetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(FetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
