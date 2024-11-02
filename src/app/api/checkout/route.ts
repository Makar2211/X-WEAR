import { CheckoutData } from "@/shared/types/sheams";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import { getUseInfo } from "@/shared/lib/get-user-info";
import { Stripe } from "stripe";
import { IProductsCart } from "@/shared/types";
import { OrderStatus } from "@prisma/client";
import { getUserCart } from "@/shared/lib/get-user-cart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export interface ICheckoutProps extends CheckoutData {
  checkbox: boolean;
  items: IProductsCart[];
  totalAmount: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: ICheckoutProps = await request.json();
    const user = await getUseInfo().then((res) => res?.json());
    const cart = await getUserCart().then((res) => res?.json());

    let adress = undefined;

    if (body.checkbox) {
      const existingAddress = await prisma.adress.findFirst({
        where: {
          userId: user.id,
          AND: [
            { name_of_company: body.name_of_company },
            { country: body.country },
            { street: body.street },
            { apartment: body.apartment },
            { city: body.city },
            { neighborhoods: body.neighborhoods },
            { index: body.index },
          ],
        },
      });

      if (existingAddress) {
        throw new Error("Адрес с такими данными уже существует в базе данных");
      }

      adress = await prisma.adress.create({
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
    }

    const order = await prisma.checkout.create({
      data: {
        userId: user.id,
        cartId: cart.id,
        name_of_company: body.name_of_company,
        country: body.country,
        street: body.street,
        apartment: body.apartment,
        city: body.city,
        neighborhoods: body.neighborhoods,
        index: body.index,
        totalAmountCart: body.totalAmount,
        status: OrderStatus.PENDING,
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: body.items.map((item) => ({
        price_data: {
          currency: "uah",
          product_data: {
            name: item.product.name,
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/?paid`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/?canseled`,
      metadata: { orderId: order.id, cartId: cart.id },
    });

    if (session.url) return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("При оплате товаров произошла ошибка", error);
  }
}
