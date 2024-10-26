import { Brand, Color, Product } from "@prisma/client";
import { Metadata } from "next";
import {
  CartButton,
  Container,
  ItemTabs,
  SelectSize,
  SwiperItemImg,
} from "../../../shared/components/elements";
import { PropsSize } from "../../../shared/components/elements/select-size";

export type IReturnProductProps = Product & {
  sizes: PropsSize[];
  colors: Color[];
  brand: Brand;
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = params.id;

  const product = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/api/products/sneakers/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

  return {
    title: "Обувь | " + product?.name,
  };
}

/* export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/sneakers?category=krosovki`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const products = await response.json();

    if (!products || products.length === 0) {
      return {
        notFound: true,
      };
    }

    return products.map((product: Product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw new Error("Failed to fetch products");
  }
} */

const getProduct = async (id: string): Promise<IReturnProductProps | null> => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/sneakers/${id}`
    ).then((res) => res.json());
    return data;
  } catch (error) {
    console.log(error, "При получении продукта произошла ошибка");
    return null;
  }
};

export default async function FullSneakerPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <Container className="mt-10 mb-10 px-10 max-lg:px-4">
        <h2 className="font-black text-[32px]">Product not found</h2>
      </Container>
    );
  }

  return (
    <Container className="mt-10 mb-10 px-10 max-lg:px-4 ">
      <div className="flex justify-start items-start gap-10 max-lg:justify-between max-lg:gap-3  max-[675px]:flex-col">
        {/* Правая часть, свайпер */}
        <h2 className="hidden max-[675px]:inline  font-black text-[24px]">
          {product?.name?.toLocaleUpperCase()}
        </h2>
        <SwiperItemImg images={product.imageUrl} />
        <div className="w-[500px]  max-[675px]:w-[75%] max-[500px]:w-full">
          <h2 className="font-black text-[32px] max-lg:text-[28px] max-md:text-[24px] max-[675px]:hidden">
            {product?.name?.toLocaleUpperCase()}
          </h2>

          <SelectSize product={product} />
        </div>
      </div>

      <ItemTabs product={product} />
    </Container>
  );
}
