import { create } from "zustand";
import { CartDTO, IProductsCart } from "../types";
import toast from "react-hot-toast";
import { getCartDetails } from "./../services/get-сart-details";
export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: IProductsCart[];

  /* Получение товаров из корзины */
  fetchCartItems: () => Promise<void>;

  /* Запрос на обновление количества товара */
  updateItemQuantity: (
    id: number,
    quantity: number,
    size: string
  ) => Promise<void>;

  /* Запрос на добавление товара в корзину */
  addCartItem: (values: any) => Promise<void>;

  /* Запрос на удаление товара из корзины */
  removeCartItem: (id: number, size: string) => Promise<void>;
}

interface CreateCartItemValues {
  productItemId: number;
  size: string;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: false,
  totalAmount: 0,
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/get`,
        {
          cache: "no-store",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.error("Fetch error cart item:", response.statusText);
        set({ error: true });
        return;
      }
      const res: CartDTO = await response.json();
      set(getCartDetails(res));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  removeCartItem: async (id: number, size: string) => {
    try {
      set({ loading: true, error: false });
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/` + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ size }),
        }
      );
      if (!data.ok) {
        set({ error: true });
        toast.error("Ошибка");
      }
      const updatedItem: CartDTO = await data.json();
      set(getCartDetails(updatedItem));
      toast.success("Товар успешно удалён");
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number, size: string) => {
    try {
      set({ loading: true, error: false });
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/` + id,
        {
          method: "PATCH",
          body: JSON.stringify({ quantity, size }),
        }
      );
      if (!data.ok) {
        toast.error("ошибка при изменении товара в корзине");
      }
      const updatedItem: CartDTO = await data.json();
      set(getCartDetails(updatedItem));
      toast.success("Количество товара обновлено");
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (!response.ok) {
        set({ error: true });
      }
      const data: CartDTO = await response.json();
      toast.success("Товар добавлен в корзину");
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false, error: false });
    }
  },
}));
