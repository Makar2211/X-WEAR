import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "../../../../../prisma/prisma-client";
import { authOptions } from "@/shared/lib/authOptions";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  try {
    await prisma.user.update({
      where: {
        email: session?.user?.email as string,
      },
      data: {
        email: email as string,
      },
    });

    return NextResponse.redirect(
      new URL(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/?update-email=true`,
        request.url
      )
    );
  } catch (error) {
    console.error("Не удалось изменить почту", error);
    return NextResponse.json(
      { error: "Не удалось изменить почту" },
      { status: 500 }
    );
  }
}
