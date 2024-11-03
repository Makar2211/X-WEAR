"use client";
import React from "react";
import { cn } from "../../lib/utils";
import { IProductsCart } from "../../types";
import { CartItemSkeleton, EmptyCart, ProductCart } from "../elements";
import { Button } from "../ui/button";
import Link from "next/link";
import { useCart } from "../../hooks";

interface Props {
  className?: string;
}

export const ProductsCart: React.FC<Props> = ({ className }) => {
  const { items, loading, updateItemQuantity, removeCartItem, totalAmount } =
    useCart();
  if (loading) {
    return (
      <div className="flex items-center justify-center flex-col gap-3">
        {[...Array(3)].map((_, index) => (
          <CartItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!items?.length) {
    return <EmptyCart />;
  }

  return (
    <div className="cart-container">
      <ul className="flex flex-col justify-between items-center">
        {items.map((item: IProductsCart) => (
          <ProductCart
            key={item.product.id}
            product={item}
            updateItemQuantity={updateItemQuantity}
            removeCartItem={removeCartItem}
          />
        ))}
      </ul>
      <Link href="/checkout" className="flex justify-center items-center mt-3">
        <Button variant="blackandwhite" className="w-[250px] h-[66px]">
          Перейти к оплате {totalAmount} UAH
        </Button>
      </Link>
    </div>
  );
};
