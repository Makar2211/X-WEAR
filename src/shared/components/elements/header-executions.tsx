"use client";
import React from "react";
import Link from "next/link";
import { Search, ShoppingCart, Star, User } from "lucide-react";

import { useMedia } from "react-use";

import { IProductsCart } from "../../types";
import { HeaderSearch } from "./header-search";

interface Props {
  loading: boolean;
  items: IProductsCart[];
  totalAmount: number;
  className?: string;
  toggleSearch: boolean;
  handleSearch: () => void;
}

export const HeaderExecutions: React.FC<Props> = ({
  loading,
  items,
  totalAmount,
  className,
  toggleSearch,
  handleSearch,
}) => {
  const isMedia768 = useMedia("(max-width: 768px)");
  return (
    <div
      className={`flex  items-center gap-6 ${
        toggleSearch && !isMedia768
          ? "w-full flex justify-end"
          : "justify-center"
      }`}
    >
      {toggleSearch && !isMedia768 && <HeaderSearch />}
      {!isMedia768 && (
        <Search
          onClick={handleSearch}
          className={` hover:text-blue-500 z-10 cursor-pointer duration-200 ${
            toggleSearch ? "text-blue-500" : "text-white"
          }`}
        />
      )}
      <Link href="/profile">
        <User className="text-white hover:text-blue-500 cursor-pointer duration-200" />
      </Link>
      <Link
        className="flex justify-center items-center gap-2 relative"
        href="/cart"
      >
        <div className="flex gap-2 group cursor-pointer duration-200">
          <ShoppingCart className="text-white group-hover:text-blue-500" />
          <span className="text-white group-hover:text-blue-500 max-lg:hidden">
            {totalAmount} UAH
          </span>
        </div>
        <span className="flex justify-center items-center rounded-full w-5 h-5 bg-blue-400 text-white text-xs px-1 group-hover:bg-blue-500 max-lg:absolute left-4 top-[-6px]">
          {items.length}
        </span>
      </Link>
    </div>
  );
};
