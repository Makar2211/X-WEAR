import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const data = await prisma.brand.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
