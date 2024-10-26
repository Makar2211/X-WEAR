import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { Resend } from "resend";
import { prisma } from "../../../../../prisma/prisma-client";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const hashedPassword = await hash(password, 10);

    const isUserNew = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUserNew) {
      return NextResponse.json(
        { message: "Такой пользователь уже существует" },
        { status: 400 }
      );
    }

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        emailVerified: false,
      },
    });

    const verificationLink = `${process.env.NEXT_PUBLIC_API_URL}/api/user/verify?email=${email}`;
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Подтверждение регистрации",
      html: `<p>Здравствуйте! Пожалуйста, подтвердите вашу почту, перейдя по ссылке ниже:</p><a href="${verificationLink}">Подтвердить почту</a>`,
    });
    return NextResponse.json({
      message: "Пользователь успешно зарегистрирован",
    });
  } catch (e) {
    console.log({ e, message: "error in register" });
    return NextResponse.json(
      { message: "Произошла ошибка при регистрации" },
      { status: 500 }
    );
  }
}
