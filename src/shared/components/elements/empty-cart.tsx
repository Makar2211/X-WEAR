import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import Link from "next/link";

interface Props {
  className?: string;
}

export const EmptyCart: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center mt-10 mb-10",
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute w-[68px] h-[68px] bg-blue-500 rounded-full z-0 bottom-1"></div>
        <Image
          src="/img/empty-cart.png"
          width={80}
          height={80}
          alt="cart-empty"
          className="relative z-10"
        />
      </div>
      <span className="text-center font-extrabold text-[24px] text-[#303030] mt-3">
        Ваша корзина на <br /> данный момент пуста.
      </span>
      <span className="text-center text-[16px] text-[#666666] mt-3">
        Прежде чем приступить к оформлению заказа, вы должны добавить <br />{" "}
        некоторые товары в корзину. На странице Каталог вы найдете много <br />{" "}
        интересных товаров.
      </span>
      <Link href="/sneakers">
        <Button variant="blackandwhite" className=" w-[220px] h-[66px] mt-3">
          ПЕРЕЙТИ В КАТАЛОГ
        </Button>
      </Link>
    </div>
  );
};
