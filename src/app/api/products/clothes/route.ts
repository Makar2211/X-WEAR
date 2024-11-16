import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
    const sizesArray =
        req.nextUrl.searchParams.get("sizes")?.split(",").map(String) || [];
    const colorsArray =
        req.nextUrl.searchParams.get("colors")?.split(",").map(String) || [];
    const categoryArray =
        req.nextUrl.searchParams.get("category")?.split(",").map(String) || [];
    const brandsArray =
        req.nextUrl.searchParams.get("brands")?.split(",").map(String) || [];
    const modelsArray =
        req.nextUrl.searchParams.get("models")?.split(",").map(String) || [];

    const sortBy = req.nextUrl.searchParams.get("sortBy");

    const priceFrom = req.nextUrl.searchParams.get("priceFrom");
    const priceTo = req.nextUrl.searchParams.get("priceTo");
    const minPrice = priceFrom ? Number(priceFrom) : 0;
    const maxPrice = priceTo ? Number(priceTo) : 10000;

    const order =
        sortBy === "asc" || sortBy === "desc"
            ? { price: sortBy }
            : { createdAt: "desc" };

    try {
        const products = await prisma.product.findMany({
            where: {
                categoryId: 2,
                price: {
                    gte: minPrice,
                    lte: maxPrice,
                },
                ...(sizesArray.length > 0 && {
                    sizes: { some: { size: { size: { in: sizesArray } } } },
                }),
                ...(colorsArray.length > 0 && {
                    colors: { some: { color: { name: { in: colorsArray } } } },
                }),
                ...(categoryArray.length > 0 && {
                    categoryProduct: { url: { in: categoryArray } },
                }),
                ...(brandsArray.length > 0 && {
                    brand: { name: { in: brandsArray } },
                }),
                ...(modelsArray.length > 0 && {
                    name: { in: modelsArray },
                }),
            },
            orderBy: sortBy
                ? sortBy === "created_at"
                    ? { createdAt: "desc" }
                    : { price: sortBy === "asc" ? "asc" : "desc" }
                : { createdAt: "asc" },
            include: {
                category: true,
                brand: true,
                categoryProduct: true,
                colors: {
                    select: {
                        color: true,
                        colorId: true,
                    },
                },
                sizes: {
                    select: {
                        size: true,
                        sizeId: true,
                    },
                },
            },
        });

        if (!products) {
            return NextResponse.json({ message: "Products not found" });
        }

        return NextResponse.json(products);
    } catch (error) {
        console.error("Ошибка при получении данных", error);
        return NextResponse.json({ message: "Internal server error" });
    }
}
