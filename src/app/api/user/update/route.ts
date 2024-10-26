import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "../../../../../prisma/prisma-client";
import { authOptions } from "@/shared/lib/authOptions";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const { email, name, last_name, phone } = await request.json();
  try {
    if (session?.user?.email !== email) {
      return NextResponse.error();
    }

    await prisma.user.update({
      where: {
        email: session?.user?.email as string,
      },
      data: {
        name,
        last_name,
        phone,
      },
    });
    return NextResponse.json({
      message: "Электронная почта успешно изменена",
    });
  } catch (error) {
    console.error("Failed to update user data:", error);
    return NextResponse.json(
      {
        error: "Failed to update user data",
        details: error,
      },
      { status: 500 }
    );
  }
}
