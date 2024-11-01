import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";
import { OrderStatus } from "@prisma/client";
import { prisma } from "../../../../../prisma/prisma-client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature")!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    const cartId = session.metadata?.cartId;

    try {
      if (orderId) {
        await prisma.checkout.update({
          where: { id: Number(orderId) },
          data: { status: OrderStatus.SUCCEEDED },
        });

        await prisma.cart.deleteMany({ where: { id: Number(cartId) } });

        console.log(
          `Order ${orderId} marked as SUCCESS and cart cleared for user: ${cartId}`
        );
      }
    } catch (error) {
      console.error("Error processing checkout completion:", error);
    }
  }

  return NextResponse.json({ received: true });
}
