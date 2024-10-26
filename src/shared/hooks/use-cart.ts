import React from "react";
import { useCartStore } from "../store/cart";
import { IProductsCart } from "../types";

type ReturnProps = {
  totalAmount: number;
  items: IProductsCart[];
  loading: boolean;
  updateItemQuantity: (
    id: number,
    quantity: number,
    size: string
  ) => Promise<void>;
  removeCartItem: (id: number, size: string) => Promise<void>;
  addCartItem: (values: any) => Promise<void>;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);
  React.useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};
