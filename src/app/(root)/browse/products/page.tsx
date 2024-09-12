"use client";
import React, { useEffect, useState } from "react";
import { FetchAllProducts } from "@/redux/features/products";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import CustomPagination from "@/components/CustomPagination";
import { Input } from "@/components/ui/input";

const Products = () => {
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, error, products } = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      FetchAllProducts({
        limit: 30,
        skip: (currentPage - 1) * 30,
        sortBy: order ? "title" : "",
        order,
      })
    );
  }, [currentPage, order]);

  return (
    <div className=" flex flex-col gap-8 py-10">
      <header className=" flex items-center justify-between">
        <div className=" flex items-center gap-10">
          <h1 className=" text-3xl font-semibold">Products</h1>
        </div>
        <Select defaultValue={order} onValueChange={(value) => setOrder(value)}>
          <SelectTrigger className="w-[180px] border border-[#171717]">
            <SelectValue placeholder="Order products" />
          </SelectTrigger>
          <SelectContent className=" bg-[#171717] border-[#171717] text-white">
            <SelectItem className=" cursor-pointer" value="asc">
              Asc
            </SelectItem>
            <SelectItem className=" cursor-pointer" value="desc">
              Desc
            </SelectItem>
          </SelectContent>
        </Select>
      </header>
      <div className=" grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 30 }).map((_, indx) => (
              <div
                key={indx}
                className=" bg-slate-800 animate-pulse w-full h-96 rounded-md"
              ></div>
            ))
          : products.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
      <CustomPagination
        totalPosts={products.total}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        postsPerPage={30}
      />
    </div>
  );
};

export default Products;
