import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Color } from "@prisma/client";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { deliveryTabs } from "../../constants";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { IReturnProductProps } from "@/src/app/sneakers/[id]/page";

type PropsFullInfoProduct = {
  className?: string;
  product: IReturnProductProps;
};

export const ItemTabs: React.FC<PropsFullInfoProduct> = ({
  className,
  product,
}) => {
  return (
    <Tabs
      defaultValue="details"
      className="w-[60%] max-lg:w-[90%] max-sm:w-full justify-start mt-14"
    >
      <TabsList className="w-[400px] max-[425px]:w-full">
        <TabsTrigger
          className="data-[state=active]:text-blue-500  w-[100px]  justify-ceneter"
          value="details"
        >
          Детали
        </TabsTrigger>

        <TabsTrigger
          className=" data-[state=active]:text-blue-500 w-[100px] justify-ceneter"
          value="delivery"
        >
          <h3>Доставка</h3>
        </TabsTrigger>

        <TabsTrigger
          className=" data-[state=active]:text-blue-500 w-[100px] justify-ceneter"
          value="checkout"
        >
          Оплата
        </TabsTrigger>

        <TabsTrigger
          className=" data-[state=active]:text-blue-500 w-[100px] justify-ceneter"
          value="faq"
        >
          FAQ
        </TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <ul className="w-[400px] mt-5 max-[425px]:w-full ">
          <li className="flex justify-between items-end  max-[425px]:flex-col max-[425px]:items-start ">
            <span>Артикул</span>
            <span className="border-b-dotted max-[425px]:hidden" />
            <span className="font-bold whitespace-nowrap">
              {product.artikul}
            </span>
          </li>
          <li className="flex justify-between items-end max-[425px]:flex-col max-[425px]:items-start">
            <span>Категория</span>
            <span className="border-b-dotted max-[425px]:hidden" />
            <Link
              href="/sneakers"
              className="flex items-center hover:text-blue-500"
            >
              <span className="font-bold whitespace-nowrap">Обувь</span>
              <ChevronRight size={14} />
            </Link>
          </li>
          <li className="flex justify-between items-end max-[425px]:flex-col max-[425px]:items-start">
            <span>Бренд</span>
            <span className="border-b-dotted max-[425px]:hidden" />
            <Link
              href={`/sneakers?brands=${product.brand.name}`}
              className="flex items-center hover:text-blue-500"
            >
              <span className="font-bold">{product.brand.name}</span>
              <ChevronRight size={14} />
            </Link>
          </li>
          <li className="flex justify-between items-end max-[425px]:flex-col max-[425px]:items-start">
            <span>Модель</span>
            <span className="border-b-dotted max-[425px]:hidden" />
            <Link
              href={`/sneakers?models=${product.name}`}
              className="flex items-center hover:text-blue-500"
            >
              <span className="font-bold whitespace-nowrap">
                {product.name}
              </span>
              <ChevronRight size={14} />
            </Link>
          </li>

          <li className="flex justify-between items-end max-[425px]:flex-col max-[425px]:items-start">
            <span>Цвет</span>
            <span className="border-b-dotted max-[425px]:hidden" />
            <Link
              href={`/sneakers`}
              className="flex items-center hover:text-blue-500"
            >
              {product.colors.map((item: Color) => (
                <>
                  <span className="font-bold whitespace-nowrap">
                    {item.name}
                  </span>
                  <ChevronRight size={14} />
                </>
              ))}
            </Link>
          </li>
          <li className="flex justify-between items-end max-[425px]:flex-col max-[425px]:items-start">
            <span>Коллаборация</span>
            <span className="border-b-dotted max-[425px]:hidden" />

            <span className="font-bold whitespace-nowrap">
              {product.colobarizations}
            </span>
          </li>
        </ul>
      </TabsContent>
      <TabsContent value="delivery">
        <div className="w-full mt-5">
          <h3 className="font-bold text-2xl">Доставка</h3>
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-[16px] mt-2">
              Команда XWEAR предоставляет услугу доставки только оригинальных
              товаров c крупнейшего китайского маркетплейса Poizon, чтобы наши
              клиенты экономили более 40% на каждой покупке. Мы ценим вас,
              поэтому постоянно работаем над логистикой, чтобы ускорить время
              доставки заказов!
            </span>

            <span className="font-semibold text-[16px]">
              Все заказы отправляются из-за границы с возможностью доставки в
              любой город Украины, перед отправкой товар всегда проходит
              проверку на подлиность.
            </span>

            <span className="font-semibold text-[16px]">
              Доставляем вещи из-за границы за 12-16 дней до Украины, включая
              день оплаты, с возможностью самовывоза из города Днепр. В другие
              города отправляем СДЭКом.
            </span>

            <span className="font-semibold text-[16px]">
              СДЭК оплачивается при получении. Цена доставки зависит от города
              вашего проживания, в среднем это 350 грн.
            </span>
          </div>

          <h3 className="text-[20px] font-bold mt-6">
            В личном кабинете вы сможете отслеживать статус заказа:
          </h3>
          <div className="grid grid-cols-3 gap-10 mt-3 max-sm:grid-cols-2 max-sm:gap-2 max-[475px]:grid-cols-1">
            {deliveryTabs.map((tab) => (
              <div
                key={tab.desc}
                className="flex flex-col gap-3 max-[475px]:flex-row max-[475px]:gap-5"
              >
                <span className="min-w-16 h-16 flex justify-center items-center rounded-full border border-gray-200">
                  <Check className="text-blue-500" size={18} />
                </span>
                <div>
                  <h4 className="font-extrabold text-[18px]">{tab.name}</h4>
                  <p className="text-[#686B71] text-[16px]">{tab.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="checkout">
        <div className="mt-5">
          <div>
            <h3 className="font-bold text-2xl">Способы оплаты:</h3>
            <span className="font-normal text-[16px] mt-2">
              Команда XWEAR предоставляет услугу доставки только оригинальных
              товаров c крупнейшего китайского маркетплейса Poizon, чтобы наши
              клиенты экономили более 40% на каждой покупке.
            </span>
          </div>

          <div>
            <h3 className="font-bold text-2xl mt-5">
              Мы принимаем оплату банковскими картами:
            </h3>
            <div className="flex items-center  gap-3 mt-3">
              <span className="w-16 h-14 border bg-[#EEEEEE] border-[#EEEEEE] rounded flex items-center justify-center">
                <Image
                  src="/img/master-card.png"
                  width={45}
                  height={25}
                  alt="master-cart"
                />
              </span>
              <span className="w-16 h-14 border bg-[#EEEEEE] border-[#EEEEEE] rounded flex items-center justify-center">
                <Image
                  src="/img/visa.png"
                  width={45}
                  height={25}
                  alt="master-cart"
                />
              </span>
            </div>

            <div className="flex flex-col gap-6 mt-4">
              <span className="font-normal text-[16px]">
                Стоимость каждого товара окончательная. В нее входит выкуп
                товара на Poizon, доставка его на наш склад в Китае, доставка из
                Китая до склада в городе Екатеринбург, все таможенные сборы и
                пошлины уже включены в стоимость.
              </span>
              <span className="font-normal text-[16px]">
                Если вам нужно отправить товар по Украине, вы сможете выбрать
                адрес доставки во время оформления заказа. Доставка оплачивается
                отдельно при получении посылки, обычно это не более 350 грн.
              </span>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="faq">
        <div className="mt-5">
          <h3 className="font-bold text-2xl">ОБЩИЕ ВОПРОСЫ</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-start" plusAndMinus={true}>
                ЧЕМ ЗАНИМАЕТСЯ ВАШ ИНТЕРНЕТ-МАГАЗИН?
              </AccordionTrigger>
              <AccordionContent>
                Продажей вещей с Европы и Америки
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-start" plusAndMinus={true}>
                ГАРАНТИРОВАНА ЛИ БЕЗОПАСНОСТЬ МОИХ ДАННЫХ?
              </AccordionTrigger>
              <AccordionContent>
                Мы гарантируем полную безопасность ваших персональных данных.
                Если у вас есть вопросы, пожалуйста, ознакомьтесь с нашей
                Политикой конфиденциальности.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-start" plusAndMinus={true}>
                ГАРАНТИРОВАНА ЛИ БЕЗОПАСНОСТЬ МОИХ ДАННЫХ?
              </AccordionTrigger>
              <AccordionContent>
                Да, мы полностью гарантируем безопасность персональных данных
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <h3 className="font-bold text-2xl mt-5">ТОВАРЫ</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-start" plusAndMinus={true}>
                ВЫ РЕАЛИЗУЕТЕ ОРИГИНАЛЬНЫЕ ТОВАРЫ?
              </AccordionTrigger>
              <AccordionContent>
                Да, исключительно брендовые вещи с разных уголков Земли
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-start" plusAndMinus={true}>
                В ВАШЕМ МАГАЗИНЕ ПРЕДСТАВЛЕНЫ НОВЫЕ ТОВАРЫ?
              </AccordionTrigger>
              <AccordionContent>
                Мы гарантируем полную безопасность ваших персональных данных.
                Если у вас есть вопросы, пожалуйста, ознакомьтесь с нашей
                Политикой конфиденциальности.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-start" plusAndMinus={true}>
                ПОЧЕМУ ЦЕНА ЗАВИСИТ ОТ РАЗМЕРА?
              </AccordionTrigger>
              <AccordionContent>
                На каждый размер тратиться разное количество материалов
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-start" plusAndMinus={true}>
                СТОИМОСТЬ ТОВАРОВ ОКОНЧАТЕЛЬНАЯ?
              </AccordionTrigger>
              <AccordionContent>
                Нет, мы миняем цены взависимости от потребителей
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <h3 className="font-bold text-2xl">ДОСТАВКА</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-start" plusAndMinus={true}>
                СКОЛЬКО ИДЕТ ДОСТАВКА?
              </AccordionTrigger>
              <AccordionContent>
                Доставка занимает от 12 до 16 дней
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-start" plusAndMinus={true}>
                МОЖНО ЛИ ВЕРНУТЬ ТОВАР?
              </AccordionTrigger>
              <AccordionContent>Да, в течении 14-ти дней</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </TabsContent>
    </Tabs>
  );
};
