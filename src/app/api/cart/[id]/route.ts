import { getUserCart } from "@/shared/lib/get-user-cart";
import { updateTotalAmountCart } from "@/shared/lib/update-total-amount-cart";
import { CartDTO } from "@/shared/types";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { quantity, size } = await request.json();

  try {
    const cart: CartDTO = await getUserCart().then((res) => res?.json());
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: Number(id),
        size,
      },
    });
    if (!cartItem) {
      return NextResponse.json({
        message: "Элемент корзины не найден",
      });
    }

    await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity: quantity },
    });
    const updateCart = await updateTotalAmountCart().then((res) => res?.json());
    console.log(updateCart, "updateCart");
    return NextResponse.json(updateCart);
  } catch (error) {
    console.error("При изменении количества товара произошла ошибка", error);
    return NextResponse.error();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { size } = await request.json();
    const cart = await getUserCart().then((res) => res?.json());

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: Number(cart.id),
        size: size,
        productId: Number(params.id),
      },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Товар не найден в корзине" },
        { status: 404 }
      );
    }

    if (cartItem) {
      await prisma.cartItem.delete({
        where: {
          id: cartItem.id,
        },
      });
    }
    const updateCart = await updateTotalAmountCart().then((res) => res?.json());
    return NextResponse.json(updateCart);
  } catch (error) {
    console.error("Не удалось удалить товар из корзины", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
