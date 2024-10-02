import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function GET(request: Request) {
  try {
    const data = await prisma.product.findMany({
      where: {
        categoryId: 1,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
