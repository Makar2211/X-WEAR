import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../../../prisma/prisma-client";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id
    try {
        await prisma.adress.delete({
            where: {
                id: Number(id)
            }
        })

        return NextResponse.json('Адрес успешно удален')
    } catch (e) {
        console.error(e, "Не удалось удалить адрес")
        return NextResponse.error()
    }
}
