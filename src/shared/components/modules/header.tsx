"use client";
import React from "react";
import { useMedia } from "react-use";
import {
  Container,
  NavBarTop,
  HeaderExecutions,
  MobileMenu,
  HeaderSearch, HeaderSkeleton,
} from "../elements";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useCart } from "../../hooks";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = React.useState(false);
  const [toggleSearch, setToggleSearch] = React.useState(false);
  const { items, loading, totalAmount } = useCart();

  const isMedia768 = useMedia("(max-width: 768px)");
  const isMedia1200 = useMedia("(max-width: 1200px)");

  console.log(searchParams.get("checkout"));

  React.useEffect(() => {
    setIsClient(true);
	const checkout = searchParams.get("checkout")
    let toastMessage = "";

    if (checkout === 'paid') {
      toastMessage = "Заказ успешно оплачен! Информация отправлена на почту.";
    }

    if (checkout === "canseled") {
      setTimeout(() => {
        router.push("/checkout");
        toast.error("Не удалось оплатить вашу корзину", {
          duration: 3000,
        });
      }, 1000);
    }
    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");
        toast.success(toastMessage, {
          duration: 3000,
        });
      }, 1000);
    }
  }, []);

  const handleSearch = () => {
    setToggleSearch(!toggleSearch);
  };

  return (
    <>
      {isClient ? (
        <header className="bg-black h-24 px-8 py-6 max-md:px-4 sticky top-0 z-50 ">
          <Container className="flex justify-between items-center h-full">
            {!isMedia768 ? (
              <div className="flex items-center gap-6">
                <Link href="/">
                  <Image
                    src="/img/logo.svg"
                    alt="logo"
                    width={80}
                    height={33}
                    className="max-w-none"
                  />
                </Link>
                {isMedia1200 && <MobileMenu />}
              </div>
            ) : (
              <div className="flex items-center gap-3 max-md:gap-1 max-sm:gap-0 mr-2">
                <MobileMenu />
                <Dialog open={toggleSearch}>
                  <DialogTrigger asChild>
                    <Search
                      onClick={() => handleSearch()}
                      className={` hover:text-blue-500 z-10 cursor-pointer duration-200 ${
                        toggleSearch ? "text-blue-500" : "text-white"
                      }`}
                    />
                  </DialogTrigger>
                  <DialogContent className="w-[90%] top-[10%] p-0">
                    <HeaderSearch setToggleSearch={setToggleSearch} />
                  </DialogContent>
                </Dialog>
              </div>
            )}
            {isMedia768 && (
              <Link href="/">
                <Image src="/img/logo.svg" alt="logo" width={80} height={33} />
              </Link>
            )}
            {!toggleSearch && !isMedia1200 && <NavBarTop />}
            <HeaderExecutions
              loading={loading}
              items={items}
              totalAmount={totalAmount}
              toggleSearch={toggleSearch}
              handleSearch={handleSearch}
            />
          </Container>
        </header>
      ) : <HeaderSkeleton />}
    </>
  );
};
