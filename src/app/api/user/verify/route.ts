import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { message: "Некорректная ссылка для подтверждения" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Пользователь не найден" },
      { status: 404 }
    );
  }

  await prisma.user.update({
    where: { email },
    data: { emailVerified: true },
  });

  return NextResponse.redirect(
    new URL(`${process.env.NEXT_PUBLIC_API_URL}/?verified=true`, request.url)
  );
}
