import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
import { prisma } from "../../../../../prisma/prisma-client";
import { Resend } from "resend";
import { getUseInfo } from "@/shared/lib/get-user-info";
import ReactDOMServer from "react-dom/server";
import { getUserCart } from "@/shared/lib/get-user-cart";
import { OrderStatus } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get("stripe-signature")!;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endpointSecret
      );
    } catch (error) {
      console.error("Webhook signature verification failed:", error);
      return NextResponse.json({ error: "Webhook verification failed" });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = Number(session.metadata?.orderId);
      const cartId = Number(session.metadata?.cartId);

      const user = await getUseInfo().then((res) => res?.json());
      const cart = await getUserCart().then((res) => res?.json());

      try {
        if (orderId && cartId) {
          await prisma.checkout.update({
            where: { id: orderId },
            data: { status: OrderStatus.SUCCEEDED },
          });

          // await resend.emails.send({
          //   from: "onboarding@resend.dev",
          //   to: "makardovgopolji@gmail.com",
          //   subject: `Спасибо за заказ №${orderId} на сумму ${cart.totalAmount} ₴ на сайте X-WEAR на сайте X-WEAR`,
          //   react: "",
          // });
          await prisma.cartItem.deleteMany({
            where: { cartId: 1 },
          });
          await prisma.cart.update({
            where: { id: 1 },
            data: {
              totalAmount: 0,
            },
          });

          console.log(
            `Order ${orderId} marked as SUCCESS and cart cleared for user: ${cartId}`
          );
        }
      } catch (error) {
        console.error("Error processing checkout completion:", error);
      }
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error("Ошибка при успешной оплате", error);
    return NextResponse.error();
  }
}
