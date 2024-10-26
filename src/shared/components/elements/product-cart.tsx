"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CircleX, Minus, Plus } from "lucide-react";
import { cn } from "../../lib/utils";
import { IProductsCart } from "../../types";
import { useCategoryProduct } from "../../hooks/use-category-product";
import { useCart } from "../../hooks";
import { useCartStore } from "../../store/cart";

interface Props {
  className?: string;
  product: IProductsCart;
  updateItemQuantity: (
    id: number,
    quantity: number,
    size: string
  ) => Promise<void>;
  removeCartItem: (id: number, size: string) => Promise<void>;
}

export const ProductCart: React.FC<Props> = ({
  className,
  product,
  updateItemQuantity,
  removeCartItem,
}) => {
  const categoryName = useCategoryProduct(product.product.categoryId);

  const handleQuantity = async (quantityTrigger: "minus" | "plus") => {
    const onQuantityChange =
      quantityTrigger === "minus" ? product.quantity - 1 : product.quantity + 1;
    await updateItemQuantity(
      product.product.id,
      onQuantityChange,
      product.size
    );
  };

  return (
    <li
      className={cn(
        "w-1/2 flex justify-between items-center max-lg:w-[70%] max-md:w-[90%] max-sm:w-[95%]",
        className
      )}
    >
      <Link href={`/${categoryName}/${product.product.id}`}>
        <div className="flex flex-col items-start w-[200px]">
          <Image
            src={product.product.imageUrl[0]}
            alt={product.product.name}
            width={150}
            height={150}
          />
          <b>{product.product.name}</b>
        </div>
      </Link>

      <div className="flex flex-col">
        <div className="flex gap-3">
          <Minus
            onClick={() => !product.disabled && handleQuantity("minus")}
            className={`cursor-pointer ${
              product.disabled
                ? "opacity-20 cursor-not-allowed"
                : "hover:opacity-70"
            }`}
          />
          <span className="font-bold">{product.quantity}</span>
          <Plus
            onClick={() => handleQuantity("plus")}
            className="cursor-pointer  hover:opacity-70"
          />
        </div>

        <span className="">Размер: {product.size}</span>
        <span className="">Цена: {product.product.price} ₴</span>
      </div>

      <CircleX
        className="cursor-pointer hover:opacity-70"
        onClick={() => removeCartItem(product.product.id, product.size)}
      />
    </li>
  );
};
