import { getUserCart } from "@/shared/lib/get-user-cart";
import { getUseInfo } from "@/shared/lib/get-user-info";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function POST(request: NextRequest) {
  const { productItemId, size } = await request.json();
  try {
    let cart = await getUserCart().then((res) => res?.json());
    const user = await getUseInfo().then((res) => res?.json());

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: Number(user?.id),
        },
      });
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(productItemId) },
    });

    if (!product) {
      return NextResponse.json({
        message: "Товар не найден",
      });
    }

    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: Number(cart?.id),
        productId: Number(productItemId),
        size: size,
      },
    });

    let updatedCartItem;

    if (existingCartItem) {
      updatedCartItem = await prisma.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + 1,
        },
      });
    } else {
      updatedCartItem = await prisma.cartItem.create({
        data: {
          cartId: Number(cart?.id),
          productId: Number(productItemId),
          size: size,
          quantity: 1,
        },
      });
    }

    // Обновляем общую сумму корзины
    const addedAmount = product.price;
    await prisma.cart.update({
      where: { id: Number(cart?.id) },
      data: {
        totalAmount: cart.totalAmount + addedAmount,
      },
    });
    console.log("updatedCartItem", updatedCartItem);
    return NextResponse.json(updatedCartItem);
  } catch (error) {
    console.error("ошибка при добавлении в корзину", error);
    return NextResponse.json({
      message: "ошибка при добавлении товара в корзину",
    });
  }
}
