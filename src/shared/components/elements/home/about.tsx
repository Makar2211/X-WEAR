import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import React from "react";
import { Container } from "../container";

interface Props {
  className?: string;
}

const aboutBlocks = [
  {
    imageUrl: "/img/delivery.svg",
    name: "Бесплатная доставка до Украины",
    desc: "Доставим вам заказ абсолютно бесплатно до Украины",
  },
  {
    imageUrl: "/img/brokers.svg",
    name: "мы Работаем без посредников",
    desc: "Между нами и клиентом нет третьего лишнего",
  },
  {
    imageUrl: "/img/easy-usage.svg",
    name: "простота в заказе и использовании",
    desc: "Для заказа с Poizon не нужно никаких приложений",
  },
];

export const About: React.FC<Props> = ({ className }) => {
  return (
    <section className={cn("bg-[#D9D9D9]  pt-[350px] mt-[-300px]", className)}>
      <div className="bg-about mt-[-350px]">
        <Container className="mt-48 pt-56 pb-16 flex justify-between items-center  px-16 max-[1060px]:flex-col max-[1060px]:pt-32 max-[1060px]:px-8 max-md:px-3">
          {/* левая часть */}
          <div className="flex flex-col gap-10 w-1/2 max-[1060px]:w-full max-lg:gap-4">
            <h2 className="font-black text-4xl text-black max-lg:text-2xl">
              О ИНТЕРНЕТ- <br /> МАГАЗИНЕ XWEAR
            </h2>

            <div className=" flex flex-col gap-4 ">
              <span className="font-normal text-[16px] text-black max-lg:text-[14px]">
                Команда XWEAR предоставляет услугу доставки только оригинальных
                товаров c крупнейшего китайского маркетплейса Poizon, чтобы наши
                клиенты экономили более 40% на каждой покупке.{" "}
              </span>

              <span className="font-normal text-[16px] text-black max-lg:text-[14px]">
                Работаем без посредников, благодаря чему можем предоставлять
                лучшую цену. Быстрая, бесплатная доставка.
              </span>

              <span className="font-normal text-[16px] text-black max-lg:text-[14px]">
                Сайт, на котором можно будет удобно оформить покупку, не
                скачивая китайское мобильное приложение Poizon, с удобной
                фильтрацией огромного количества товаров, а так же с
                возможностью сразу увидеть окончательную цену товара.
              </span>
            </div>
          </div>

          {/* правая часть */}
          <div className="flex flex-col justify-between items-center  w-[415px] bg-white rounded-xl px-7 py-10 max-[1060px]:flex-row max-[1060px]:w-full  max-[1060px]:mt-5 max-[1060px]:px-2 max-sm:flex-col max-sm:items-start max-sm:px-6 max-sm:gap-5">
            {aboutBlocks.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start gap-8 max-[1060px]:flex-col max-sm:flex-row max-sm:gap-5"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={50}
                  height={50}
                />
                <div className="flex flex-col">
                  <span className="font-black text-base text-black max-[830px]:text-[15px] max-md:text-[14px]">
                    {item.name.toLocaleUpperCase()}
                  </span>
                  <span className="text-black max-md:text-[10px]">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
};
