import { getUserCart } from "@/shared/lib/get-user-cart";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  try {
    if (!session?.user) {
      throw new Error();
    }
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });
    if (!user) {
      return NextResponse.json({
        message: "Пользователь не найден",
      });
    }
    const cart = await prisma.cart.findFirst({
      where: {
        userId: Number(user?.id),
      },
      include: {
        items: {
          select: {
            product: true,
            size: true,
            quantity: true,
          },
        },
      },
    });

    return NextResponse.json(cart);
  } catch (error) {
    console.error("При получении корзины пользователя произошла ошибка");
    return NextResponse.error();
  }
}
