import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "../../../prisma/prisma-client";
import { authOptions } from "./authOptions";

export async function GetUseInfo() {
  const session = await getServerSession(authOptions);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });
    if (!user) {
      return NextResponse.json({
        message: "Пользователь не найден",
      });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("При получении пользователя что-то пошло не так");
  }
}
