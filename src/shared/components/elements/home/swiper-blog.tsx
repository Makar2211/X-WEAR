"use client";
import React from "react";

import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination} from "swiper/modules";
import {ChevronLeft, ChevronRight, Star} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
    className?: string;
    url_secrtion?: string;
    items?: any;
}

export const SwiperBlog: React.FC<Props> = ({
                                                className,
                                                url_secrtion,
                                                items,
                                            }) => {
    return (
        <section className='mb-10'>
            <Swiper
                className="swiper-items mt-5"
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={3}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    520: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    920: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                loop
                navigation={{
                    nextEl: `.${url_secrtion}-next`,
                    prevEl: `.${url_secrtion}-prev`,
                }}
                scrollbar={{draggable: true}}
                pagination={{
                    el: `.${url_secrtion}-pagination`,
                    clickable: true,
                    bulletClass: `${url_secrtion}-custom-bullet`,
                    bulletActiveClass: `${url_secrtion}-custom-bullet-active`,
                }}
            >
                {items.map((test: any, index: number) => (
                    <SwiperSlide key={index}>
                        <div className="relative ">
                            <Image
                                src={test.imageUrl}
                                alt={test.name}
                                width={300}
                                height={300}
                                loading="lazy"
                            />
                        </div>

                        <div className="flex flex-col items-start text-start">
                            <b className="font-bold text-[23px] max-xl:text-[18px] max-lg:text-[17px] max-sm:text-[15px]">
                                {test.title}
                            </b>
                            <span
                                className="font-normal text-[15px]  text-black mt-2 max-xl:text-[13px] max-lg:text-[11px] max-sm:text-[10px]">
                {test.desc}
              </span>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                            <Link
                                className="font-extrabold text-[14px]"
                                href={`/${url_secrtion}/${test.id}`}
                            >
                                УЗНАТЬ ПОДРОБНЕЕ
                            </Link>
                            <div className="text-[#8C8F96] font-normal text-[11px]">
                                16 июня 2023
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* навигация и пагинация */}
            <div className="flex items-center justify-center gap-10 mt-10">
                <button className={`${url_secrtion}-prev`}>
                    <ChevronLeft/>
                </button>

                <div className={`${url_secrtion}-pagination max-w-[120px]`}/>

                <button className={`${url_secrtion}-next`}>
                    <ChevronRight/>
                </button>
            </div>
        </section>
    );
};
