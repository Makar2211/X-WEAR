import { Product } from "@prisma/client";
export const dynamic = "force-dynamic";
export const getSwiperClothesCategory = async (): Promise<Product[]> => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/clothes/swiper`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    return data;
  } catch (error) {
    console.error(error, "При получении слайдера обуви произошла ошибка");
    return [];
  }
};
