"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { ProductItem } from "../productItem";
import { Product } from "@prisma/client";

interface Props {
  className?: string;
  url_secrtion?: string;
  items?: any;
}

export const SwiperItems: React.FC<Props> = ({
  className,
  url_secrtion,
  items,
}) => {
  return (
    <section>
      <Swiper
        className="swiper-items"
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={4}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          620: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          920: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        loop
        navigation={{
          nextEl: `.${url_secrtion}-next`,
          prevEl: `.${url_secrtion}-prev`,
        }}
        scrollbar={{ draggable: true }}
        pagination={{
          el: `.${url_secrtion}-pagination`,
          clickable: true,
          bulletClass: `${url_secrtion}-custom-bullet`,
          bulletActiveClass: `${url_secrtion}-custom-bullet-active`,
        }}
      >
        {items.map((item: Product) => (
          <SwiperSlide key={item.id}>
            <ProductItem
              item={item}
              className="flex"
              url_secrtion={"sneakers"}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* навигация и пагинация */}
      <div className="flex items-center justify-center gap-10 mt-10">
        <button className={`${url_secrtion}-prev`}>
          <ChevronLeft />
        </button>

        <div className={`${url_secrtion}-pagination max-w-[165px]`} />

        <button className={`${url_secrtion}-next`}>
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};
