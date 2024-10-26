import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";
export async function GET(requst: NextRequest) {
  /* const search = requst.url. */
  const query = requst.nextUrl.searchParams.get("search") || "";
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 6,
  });
  return NextResponse.json(products);
}
