import { cn } from "@/shared/lib/utils";
import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Container } from "../container";

interface Props {
  className?: string;
}

export const ValueCalculate: React.FC<Props> = ({ className }) => {
  return (
    <Container className="bg-custom-gradient  h-[630px] py-16 px-16 relative z-10 max-md:py-8 max-md:px-8 max-sm:px-2 max-[810px]:pt-4">
      <section className={cn("relative", className)}>
        <div className="relative">
          <h2 className="font-black text-[51px] max-md:text-[34px]">
            РАССЧИТАТЬ <br /> СТОИМОСТЬ
          </h2>
          <span className="font-normal text-[19px] mt-3 max-md:text-[14px] max-[450px]:text-[12px]">
            Если вам не удалось найти то, что искали, вы всегда можете <br />
            воспользоваться автоматическим расчетом стоимость заказа на <br />
            маркетплейсе Poizon, включая комиссию сервиса и доставку. <br />
          </span>
          <Image
            src="/img/phone-calculate-section.png"
            alt="phone-calculate-section"
            width={405}
            height={660}
            className="absolute top-[-100px] right-20 max-[1280px]:right-5 max-[1200px]:h-[400px] max-[1200px]:w-[250px] max-[980px]:hidden"
          />
        </div>

        <div className="mt-4 flex justify-start items-center gap-12 max-[1040px]:mt-10 max-[800px]:flex-col max-[800px]:items-start">
          <div className="flex justify-start items-center  gap-4">
            <span className="w-[77px] h-[77px] rounded-full bg-primary text-white flex justify-center items-center border-[1px]">
              1
            </span>
            <span className="font-semibold text-[16px]  leading-6">
              Подробная, пошаговая <br /> статья о том, как установить <br />
              приложение Poizon
            </span>
          </div>
          <div className="flex justify-start items-center gap-4">
            <span className="w-[77px] h-[77px] rounded-full bg-primary text-white flex justify-center items-center border-[1px]">
              2
            </span>
            <span className="font-semibold text-[16px] leading-6">
              Напишите нам в Telegram <br /> или WhatsApp какую вещь <br />{" "}
              хотите купить
            </span>
          </div>
        </div>

        <Link href="/calculation">
          <Button variant="default" className=" p-8 gap-4 mt-12">
            <span className="font-extrabold text-[12px]">
              РАССЧИТАТЬ СТОИМОСТЬ
            </span>
            <ChevronRight />
          </Button>
        </Link>
      </section>
    </Container>
  );
};
