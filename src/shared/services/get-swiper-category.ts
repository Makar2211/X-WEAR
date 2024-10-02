"use server";
export const getSwiperSneakersCategory = async () => {
  "use server";
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/sneakers/swiper`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    return data;
  } catch (error) {
    console.error(error, "При получении слайдера обуви произошла ошибка");
  }
};
