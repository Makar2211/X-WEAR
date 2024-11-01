import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";
import { authOptions } from "@/shared/lib/authOptions";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });
    const { password, ...userData } = user!;
    return NextResponse.json(userData);
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
}
