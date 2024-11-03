"use client";
import React from "react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMedia } from "react-use";
import { Container } from "../container";
import { Button } from "../../ui/button";
interface Props {
  className?: string;
}

const showContent = [
  {
    imageUrl: "/img/bg-show-swiper.jpg",
    title: "Широкий ассортимент одежды",
    desc: "Одежда от известные брендов у нас в каталоге. Только качественные вещи.",
    linkTitle: "Перейти в каталог",
    link: "/",
  },
  {
    imageUrl: "/img/bg-show-swiper.jpg",
    title: "Широкий ассортимент одежды",
    desc: "Одежда от известные брендов у нас в каталоге. Только качественные вещи.",
    linkTitle: "Перейти в каталог",
    link: "/",
  },
  {
    imageUrl: "/img/bg-show-swiper.jpg",
    title: "Широкий ассортимент одежды",
    desc: "Одежда от известные брендов у нас в каталоге. Только качественные вещи.",
    linkTitle: "Перейти в каталог",
    link: "/",
  },
  {
    imageUrl: "/img/bg-show-swiper.jpg",
    title: "Широкий ассортимент одежды",
    desc: "Одежда от известные брендов у нас в каталоге. Только качественные вещи.",
    linkTitle: "Перейти в каталог",
    link: "/",
  },
];

export const PreviewSlider: React.FC<Props> = ({ className }) => {
  const isMedia768 = useMedia("(max-width: 768px)");
  return (
    <Container className="mt-14 relative max-md:mt-7 max-sm:mt-5">
      <Swiper
        className="swiper-show"
        modules={[Navigation, Pagination]}
        autoplay={{
          delay: 4000,
          pauseOnMouseEnter: true,
        }}
        direction="vertical"
        pagination={{
          el: ".show-pagination",
          bulletClass: "swiper-show-bullet",
          bulletActiveClass: "show-show-bullet-active",
          clickable: true,
        }}
        navigation={{
          nextEl: ".show-next",
          prevEl: ".show-prev",
        }}
        loop
        slidesPerView={1}
      >
        {showContent.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[630px] w-full bg-cover bg-center rounded-xl"
              style={{
                backgroundImage: isMedia768
                  ? "url(/img/bg-about-mobile.jpg)"
                  : `url(${item.imageUrl})`,
              }}
            >
              <div className="flex justify-start items-start flex-col text-overlay pt-24 pl-14 text-white max-md:pl-7 max-sm:pl-3">
                <h1 className="flex flex-col items-start text-[51px] text-black font-black max-md:text-[34px] max-mobile-[19px]">
                  {item.title.split(" ").map((word, index) => (
                    <div key={index}>
                      {word.toLocaleUpperCase()}
                      <br />
                    </div>
                  ))}
                </h1>
                <span className="flex flex-col items-start text-black font-normal leading-7 mt-3 ">
                  {item.desc.split(".").map((sentence, index) => (
                    <div className="max-sm:text-[15px]" key={index}>
                      {sentence.trim()}
                      {index < item.desc.split(".").length - 1 && (
                        <>
                          .
                          <br />
                        </>
                      )}
                    </div>
                  ))}
                </span>
                <Link href={item.link}>
                  <Button className="p-8 mt-6 gap-3" variant="blackandwhite">
                    <span className="font-extrabold text-[14px]">
                      {item.linkTitle}
                    </span>
                    <ChevronRight />
                  </Button>
                </Link>
                <div className="flex gap-3 mt-12">
                  <button className="show-prev z-1 text-black w-16 h-16 bg-white flex justify-center items-center rounded-full">
                    <ChevronLeft />
                  </button>
                  <button className="show-next z-1 text-black w-16 h-16 bg-white flex justify-center items-center rounded-full">
                    <ChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="show-pagination"></div>
    </Container>
  );
};
