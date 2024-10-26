"use client";
import React from "react";
import { Product, Size } from "@prisma/client";
import { cn } from "../../lib/utils";
import { CartButton } from "./cart-button";

export interface PropsSize {
  size: Size;
  sizeId: number;
}
interface Props {
  className?: string;
  product: Product & { sizes: PropsSize[] };
}

export const SelectSize: React.FC<Props> = ({ className, product }) => {
  const [selectedSize, setSelectedSize] = React.useState<Size | null>(null);

  const onToggleSize = (size: Size) => {
    if (selectedSize === size) {
      setSelectedSize(null);
    } else {
      setSelectedSize(size);
    }
  };
  return (
    <>
      <div className={cn("max-[675px]:mt-4", className)}>
        <span>EU РАЗМЕРЫ:</span>
        <div className="grid grid-cols-4 gap-2 mt-3 mb-5 max-lg:grid-cols-3 max-[675px]:grid-cols-4">
          {product?.sizes?.map((item: PropsSize) => (
            <button
              key={item.size.id}
              onClick={() => onToggleSize(item.size)}
              className={`${
                selectedSize?.id === item.size.id
                  ? "bg-blue-500 text-white"
                  : ""
              } flex flex-col items-center rounded border border-[#EFEFEF] px-4 py-2 max-lg:px-1 max-lg:py-1 max:md:px-0 max:md:py-0`}
            >
              <span>{item.size.size}</span>
              <span>{product.price} ₴</span>
            </button>
          ))}
        </div>
      </div>
      <CartButton product={product} selectedSize={selectedSize?.size} />
    </>
  );
};
