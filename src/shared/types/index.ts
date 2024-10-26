import { Product } from "@prisma/client";

export interface IPropsCategory {
  categoryItem: "sneakers" | "clothes" | "accessories";
}

interface userCart {
  name: string;
  email: string;
  phone: string;
  last_name: string;
}
export interface IProductsCart {
  product: Product;
  size: string;
  quantity: number;
  disabled: boolean;
}

export interface CartDTO {
  id: number;
  userId: number;
  user: userCart;
  items: IProductsCart[];
  totalAmount: number;
}
