import { Metadata } from "next";
import { Container } from "@/shared/components/elements";
import { CheckoutForm } from "@/shared/components/modules";

export const metadata: Metadata = {
  title: "X-WEAR | Оформление заказа",
};

export default async function Checkout() {
  return (
    <Container className="mt-10 mb-10 px-5">
      <h2 className="text-3xl font-black text-[#121214] uppercase">Оформление заказа</h2>

      <CheckoutForm />
    </Container>
  );
}