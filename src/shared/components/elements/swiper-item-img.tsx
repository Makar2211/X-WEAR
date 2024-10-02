"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";

interface Props {
  images: string[];
}

export const SwiperItemImg: React.FC<Props> = ({ images }) => {
  return (
    <div className="mb-20 w-1/2 max-[675px]:w-full">
      <Swiper
        className="swiper-item w-full"
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop
        pagination={{
          el: `.product-item-pagination`,
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className} custom-bullet-container">
              <img src="${images[index]}" class="custom-bullet-image" />
              <span class="custom-bullet-line"></span>
            </span>`,
        }}
      >
        {images?.map((img: string, index: number) => (
          <SwiperSlide key={index}>
            <Image width={500} height={500} src={img} alt="product_img" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="product-item-pagination"></div>
    </div>
  );
};
