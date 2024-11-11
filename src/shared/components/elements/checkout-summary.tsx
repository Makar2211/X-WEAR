import { IProductsCart } from "@/shared/types";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
  items: IProductsCart[];
  totalAmount: number;
}

export const CheckoutSummary: React.FC<Props> = ({
  className,
  items,
  totalAmount,
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col  rounded border-[1px] border-[#E9EAEE] p-5 min-h-[550px] w-[35%] max-[1200px]:w-full max-sm:p-2",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[23px] uppercase text-[#303030]">
          Ваш заказ
        </h3>
        <div>
          Итого: <span className="font-bold">{totalAmount} ₴</span>
        </div>
      </div>

      <ul className="flex flex-col gap-2 max-h-[300px] overflow-auto scrollbar">
        {items.map((item: IProductsCart) => (
          <li
            key={item.product.id}
            className="flex justify-between items-center pr-2"
          >
            <div>
              <Image
                src={item.product.imageUrl[0]}
                width={100}
                height={100}
                alt={item.product.name}
              />
              <span className="max-sm:text-[13px]">{item.product.name}</span>
            </div>
            <div className="flex flex-col items-end">
              <span>Цена за 1 шт. {item.product.price} ₴ </span>
              <span>Кол-во: {item.quantity}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0 transform max-[1200px]:left-1/2 max-[1200px]:-translate-x-1/2 max-md:w-full">
        <div className="flex items-center justify-start gap-3 mb-3">
          <div className="relative flex items-center justify-center w-20 h-20 bg-[#F9F9F9] rounded-[8px] border-[1px] border-[#49D0FF]">
            <Image
              src="/img/checkout-carts.svg"
              alt="carts"
              width={38}
              height={32}
            />
            <Check
              size={13}
              className="absolute bg-[#49D0FF] text-white rounded-full top-[-3px] right-[-3px]"
            />
          </div>
          <div>
            <h4 className="font-bold text-[18px] text-[#303030] max-md:text-[16px]">
              Оплата онлайн
            </h4>
            <span className="text-[#636369] max-md:text-[12px]">
              Оплата выбранного товара на нашем сайте <br /> осуществляется
              только онлайн.
            </span>
          </div>
        </div>
        <span className="flex justify-center items-center text-[11px] text-[#8C8F96] gap-1 mb-3">
          <span> Я прочитал и согласен с </span>
          <Link href="/" className="underline">
            политикой конфиденциальности
          </Link>
        </span>
        <Button
          variant="blackandwhite"
          className="w-full h-[56px] p-0 mb-3"
          type="submit"
          form="custom-form"
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
