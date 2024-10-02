"use client";
import { createSelectSize } from "../../store/select-size";
import { Product } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface Props {
  className?: string;
  product: Product;
}

export const CartButton: React.FC<Props> = ({ className, product }) => {
  const { selectedSize } = createSelectSize((state) => state);
  return (
    <div
      className={cn(
        "flex items-center justify-between max-md:items-start max-md:flex-col ",
        className
      )}
    >
      <div className="flex flex-col">
        <span className="text-[#626262] font-normal text-[20px]">
          {product.price} ₴
        </span>
        <span className="font-bold">
          РАЗМЕР - {!selectedSize ? "НЕ ВЫБРАН" : selectedSize.size}
        </span>
      </div>

      <Button className=" p-8 max-lg:px-4" variant="blackandwhite">
        <span className="font-extrabold text-[14px]">ДОБАВИТЬ В КОРЗИНУ</span>
        <ChevronRight />
      </Button>
    </div>
  );
};
