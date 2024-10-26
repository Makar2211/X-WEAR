import { NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/prisma-client";

export async function GET() {
  try {
    const data = await prisma.product.findMany({
      take: 8,
      skip: 2,
      where: {
        categoryId: 1,
      },
    });

    if (!data) {
      return NextResponse.json({ message: "Products not found" });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
