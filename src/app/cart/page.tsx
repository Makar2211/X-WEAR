
import { ProductsCart } from "@/shared/components/modules";
import {Container} from "@/shared/components/elements";

export const dynamic = "force-dynamic";

export default async function Cart() {
  return (
    <Container className="mt-10 mb-10">
      <h2 className="text-3xl font-black px-5 ">КОРЗИНА ТОВАРОВ</h2>

      <ProductsCart />
    </Container>
  );
}
