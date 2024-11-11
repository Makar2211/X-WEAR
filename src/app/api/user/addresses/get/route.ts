import {NextRequest, NextResponse} from "next/server";
import {getUseInfo} from "@/shared/lib/get-user-info";
import {prisma} from "../../../../../../prisma/prisma-client";
import {Prisma} from "@prisma/client";

export const dynamic = 'force-dynamic'
export async function GET(req: NextRequest) {
    try{
        const user = await getUseInfo().then((res) => res?.json());
        if (!user) {
            throw new Error()
        }
        const addresses = await prisma.adress.findMany({
            where: {
                userId: user.id
            },
            orderBy: {
                createdAt: Prisma.SortOrder.desc,
            },
            include: {
                user: true
            }


        })

        return NextResponse.json(addresses)
    }catch (e) {
        console.error(e, 'Ошибка при получении адрессов пользователя')
        return NextResponse.error()
    }
}