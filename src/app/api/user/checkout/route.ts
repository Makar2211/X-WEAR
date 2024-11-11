import {NextRequest, NextResponse} from "next/server";
import {getUseInfo} from "@/shared/lib/get-user-info";
import {prisma} from "../../../../../prisma/prisma-client";
import {Prisma} from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const user = await getUseInfo().then((res) => res?.json());
        if (!user) {
            throw new Error()
        }

        const userCheckout = await prisma.checkout.findMany({
            where: {
                userId: Number(user.id)
            },
            orderBy: {
                createdAt: Prisma.SortOrder.desc,
            }


        })


        return NextResponse.json(userCheckout)
    } catch (e) {
        console.error("При получении заказов пользователя что-то пошло не так", e)
        return NextResponse.json('Произошла ошибка при получении заказов')
    }
}