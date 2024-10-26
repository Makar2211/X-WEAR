import { NextResponse } from "next/server";
import { getUserCart } from "./get-user-cart";
import { GetUseInfo } from "./get-user-info";
import { User } from "@prisma/client";
import { IProductsCart } from "../types";
import { prisma } from "../../../prisma/prisma-client";

export async function updateTotalAmountCart() {
  try {
    const user: User = await GetUseInfo().then((res) => res?.json());
    const userCart = await getUserCart().then((res) => res?.json());

    if (!userCart) return null;
    const totalAmount = userCart.items.reduce(
      (total: number, item: IProductsCart) =>
        total + item.product.price * item.quantity,
      0
    );

    const updateUserCart = await prisma.cart.update({
      where: {
        userId: user.id,
      },
      data: {
        totalAmount,
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            product: true,
            size: true,
            quantity: true,
          },
        },
      },
    });
    return NextResponse.json(updateUserCart);
  } catch (error) {
    console.error("при изменении цены корзины произошла ошибка", error);
    return NextResponse.json("при изменении цены корзины произошла ошибка");
  }
}
