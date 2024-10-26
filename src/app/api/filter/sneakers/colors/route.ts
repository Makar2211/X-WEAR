import { NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/prisma-client";

export async function GET(request: Request) {
  try {
    const data = await prisma.color.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
