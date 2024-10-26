"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useMedia } from "react-use";
import { cn } from "../../lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Container } from "../elements";
import { navBarFooter } from "../../constants/nav-bar-top";
import { Input } from "../ui/input";

interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = ({ className }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const isMedia620 = useMedia("(max-width: 620px)");
  return (
    <>
      {isClient && (
        <footer className={cn(`bg-[#121214] w-full`, className)}>
          <Container className="py-10 px-16 max-lg:py-5 max-lg:px-8  max-md:py-3  max-md:px-4">
            <Image
              src="/img/logo-footer.svg"
              alt="logo-footer"
              width={100}
              height={40}
              className="hidden mx-auto mt-3 mb-4 items-center max-sm:block"
            />
            <div className="flex justify-between items-unset gap-20 max-lg:flex-col max-sm:gap-8">
              {/* левый блок */}
              <div className="flex justify-between w-[100%] max-sm:flex-col">
                {navBarFooter.map((item) =>
                  isMedia620 ? (
                    <Accordion
                      key={item.name}
                      type="single"
                      collapsible
                      className="w-full flex flex-col items-normal"
                    >
                      <AccordionItem value={item.name}>
                        <AccordionTrigger className="justify-between">
                          {item.name}
                        </AccordionTrigger>
                        <AccordionContent>
                          {item.items.map((el) => (
                            <Link key={el.href} href="/clothes">
                              <li className="text-white list-none">
                                {el.name}
                              </li>
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <div className="flex flex-col gap-3" key={item.name}>
                      <h2 className="text-white font-black text-[15px]">
                        {item.name.toLocaleUpperCase()}
                      </h2>
                      <ul className="flex flex-col gap-2">
                        {item.items.map((el) => (
                          <Link key={el.href} href="/clothes">
                            <li className="text-white">{el.name}</li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  )
                )}
                {isMedia620 && (
                  <>
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full flex flex-col items-normal"
                    >
                      <AccordionItem value="contacts">
                        <AccordionTrigger className="justify-between">
                          КОНТАКТЫ
                        </AccordionTrigger>
                        <AccordionContent>
                          <li className="list-none">
                            <a
                              className="text-white underline"
                              href="mailto:makardovgopolji@gmail.com"
                            >
                              makardovgopolji@gmail.com
                            </a>
                          </li>

                          <li className="list-none">
                            <a
                              className="text-white font-bold"
                              href="tel:+380665820998"
                            >
                              +38(066) 58-20-998
                            </a>
                          </li>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <div className="flex mt-5 gap-3 justify-center items-center">
                      <Image
                        src="/img/telegram.svg"
                        alt="telegram"
                        width={32}
                        height={32}
                      />
                      <Image
                        src="/img/watsapp.svg"
                        alt="watsapp"
                        width={32}
                        height={32}
                      />
                    </div>
                  </>
                )}
                <div className="flex flex-col gap-3 max-sm:hidden">
                  <h2 className="text-white font-black ">КОНТАКТЫ</h2>
                  <ul className="flex flex-col gap-2">
                    <li>
                      <a
                        className="text-white underline"
                        href="mailto:makardovgopolji@gmail.com"
                      >
                        makardovgopolji@gmail.com
                      </a>
                    </li>

                    <li>
                      <a
                        className="text-white font-bold"
                        href="tel:+380665820998"
                      >
                        +38(066) 58-20-998
                      </a>
                    </li>

                    <li className="">
                      <h3 className="font-bold">МЕССЕНДЖЕРЫ</h3>
                      <div className="flex mt-1 gap-3">
                        <Image
                          src="/img/telegram.svg"
                          alt="telegram"
                          width={32}
                          height={32}
                        />
                        <Image
                          src="/img/watsapp.svg"
                          alt="watsapp"
                          width={32}
                          height={32}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* правый блок */}
              <div className="flex flex-col w-[262px] gap-3 pl-5 max-lg:justify-between max-lg:w-full">
                <div className="max-lg:flex max-lg:flex-row max-lg:justify-between max-sm:flex-col ">
                  <div className="flex flex-col gap-2 max-sm:items-center">
                    <span className="text-white font-black">
                      ПОДПИСКА НА НОВОСТИ
                    </span>
                    <span className="text-[#DCDCE0]">
                      Будьте в курсе скидок и новостей
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="Ваш email"
                      type="email"
                      className=" border-none border-b-2 text-white w-[260px] p-0"
                    />
                    <ChevronRight className="w-7 h-7  rounded-full bg-white flex items-center absolute right-[10px] top-1" />
                    <div className="h-[6px] w-full z-10 text-white" />
                  </div>
                </div>

                <span className="text-[#707076]">
                  Подписываясь на рассылку вы соглашатесь с обработкой
                  персональных данных
                </span>
              </div>
            </div>

            {/* нижний блок */}
            <div className="flex justify-between mt-8 max-sm:justify-center">
              <Image
                src="/img/logo-footer.svg"
                alt="logo-footer"
                width={100}
                height={40}
                className="max-sm:hidden"
              />

              <div className="flex flex-col">
                <Link className="underline text-white" href="/">
                  Политика конфиденциальности
                </Link>
                <Link className="underline text-white" href="/">
                  Пользовательское соглашение
                </Link>
              </div>
            </div>
          </Container>
        </footer>
      )}
    </>
  );
};
