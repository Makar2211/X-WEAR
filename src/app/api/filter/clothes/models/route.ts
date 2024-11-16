import { NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/prisma-client";

export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
  try {
    const data = await prisma.product.findMany({
      where: {
        categoryId: 2,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
