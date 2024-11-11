import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../../../prisma/prisma-client";
import {ICheckoutProps} from "@/app/api/checkout/route";
import {getUseInfo} from "@/shared/lib/get-user-info";

export async function POST(request: NextRequest) {
    const body: ICheckoutProps = await request.json();
    try {
        const user = await getUseInfo().then((res) => res?.json());
        const existingAddress = await prisma.adress.findFirst({
            where: {
                userId: user.id,
                AND: [
                    {name_of_company: body.name_of_company},
                    {country: body.country},
                    {street: body.street},
                    {apartment: body.apartment},
                    {city: body.city},
                    {neighborhoods: body.neighborhoods},
                    {index: body.index},
                ],
            },
        });

        if (existingAddress) {
            throw new Error("У вас уже есть такой адрес");
        }

        await prisma.adress.create({
            data: {
                userId: user.id,
                name_of_company: body.name_of_company,
                country: body.country,
                street: body.street,
                apartment: body.apartment,
                city: body.city,
                neighborhoods: body.neighborhoods,
                index: body.index,
            },
        });

        return NextResponse.json("Адресс успешно добавлен")
    } catch (e) {
        console.error(e, 'Ошибка при создании адресса')
        return NextResponse.error()
    }
}