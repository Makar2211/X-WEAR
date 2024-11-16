import { NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/prisma-client";

export async function GET(request: Request) {
  try {
    const data = await prisma.size.findMany({
      skip: 18,
      take: 18,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
