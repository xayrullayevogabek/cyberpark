import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  order: string;
  setOrder: Dispatch<SetStateAction<string>>;
}

const OrderSelect = ({ order, setOrder }: Props) => {
  return (
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
  );
};

export default OrderSelect;
