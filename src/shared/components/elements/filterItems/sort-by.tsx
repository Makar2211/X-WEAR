"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { sortByArray } from "../../../constants/filter";
import { createSoryByStore } from "../../../store";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "../../../lib/utils";

interface Props {
  className?: string;
}

export const SortBy: React.FC<Props> = ({ className }) => {
  const searchParams = useSearchParams();
  const sortByParams = searchParams.get("sortBy") || undefined;

  const { toggleSortBy } = createSoryByStore((state) => state);

  const handleClick = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };
  return (
    <div className={cn("relative", className)}>
      <Select
        onValueChange={toggleSortBy}
        defaultValue={sortByParams && sortByParams}
      >
        <SelectTrigger className="w-[200px] border-0 shadow-none">
          <SelectValue
            className="text-black"
            placeholder={!sortByParams && "Сортировать по"}
          />
        </SelectTrigger>
        <SelectContent className="bg-[#F3F3F7] border-0 rounded-none">
          <SelectGroup>
            {sortByArray.map((item) => (
              <SelectItem
                value={item.value}
                key={item.value}
                onClick={handleClick}
                onTouchStart={handleClick}
              >
                <span className="font-bold">{item.name}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
