"use client";
import { Product } from "@prisma/client";
import React from "react";
import { SortBy } from "./filterItems";
import { cn } from "@/shared/lib/utils";

interface Props {
  title: string;
  products: Product[];
  className?: string;
}

export const CatalogHeader: React.FC<Props> = ({
  className,
  products,
  title,
}) => {
  return (
    <div className={cn("flex justify-between items-center", className)}>
      <div>
        <h2 className="font-black text-[32px]">{title.toLocaleUpperCase()}</h2>
        <span className="text-[#8C8F96]">{products.length} товаров</span>
      </div>
      <div>
        <SortBy />
      </div>
    </div>
  );
};
