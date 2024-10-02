"use client";
import React from "react";
import Link from "next/link";
import { CircleX, Search, ShoppingCart, Star, User } from "lucide-react";
import { Input } from "../ui/input";
import { useMedia } from "react-use";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Props {
  className?: string;
  toggleSearch: boolean;
  handleSearch: () => void;
}

export const HeaderExecutions: React.FC<Props> = ({
  className,
  toggleSearch,
  handleSearch,
}) => {
  const [search, setSearch] = React.useState("");

  const isMedia768 = useMedia("(max-width: 768px)");
  return (
    <div
      className={`flex  items-center gap-6 ${
        toggleSearch ? "w-full flex justify-end" : "justify-center"
      } max-sm:flex max-sm:justify-between max-sm:gap-3 max-mobile:gap-1`}
    >
      {toggleSearch && (
        <div className="relative w-[65%] max-[1200px]:w-[60%] max-lg:w-[70%]">
          <Input
            placeholder={`${
              isMedia768 ? "Поиск" : "Поиск по каталогу товаров"
            }`}
            className="py-4 w-full px-2 h-12 rounded-2xl bg-[#f7f6f5]"
          />
          <CircleX
            onClick={() => setSearch("")}
            className="absolute top-[12px] right-4 text-gray-400 hover:text-blue-500 cursor-pointer duration-200"
          />
        </div>
      )}

      {!isMedia768 && (
        <Search
          onClick={handleSearch}
          className={` hover:text-blue-500 z-10 cursor-pointer duration-200 ${
            toggleSearch ? "text-blue-500" : "text-white"
          }`}
        />
      )}

      <Link href="/favourites">
        <Star className="text-white hover:text-blue-500 cursor-pointer duration-200" />
      </Link>
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
            11200 UAH
          </span>
        </div>
        <span className="flex justify-center items-center rounded-full w-5 h-5 bg-blue-400 text-white text-xs px-1 group-hover:bg-blue-500 max-lg:absolute left-4 top-[-6px]">
          7
        </span>
      </Link>
    </div>
  );
};
