import { CartDTO, IProductsCart } from "../types";

interface ReturnProps {
  items: IProductsCart[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item: IProductsCart) => ({
    quantity: item.quantity,
    size: item.size,
    product: item.product,
    disabled: item.quantity === 1 ? true : false,
  }));
  return {
    items,
    totalAmount: data.totalAmount,
  };
};
