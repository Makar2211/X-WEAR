import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    const data = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        brand: true,
        sizes: {
          select: {
            size: true,
            sizeId: true,
          },
        },
        colors: {
          select: {
            color: true,
            colorId: true,
          },
        },
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
  }
}
