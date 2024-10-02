"use client";
import React from "react";
import { useMedia } from "react-use";
import {
  Container,
  NavBarTop,
  HeaderExecutions,
  MobileMenu,
} from "../elements";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const [isClient, setIsClient] = React.useState(false);
  const [toggleSearch, setToggleSearch] = React.useState(false);

  const isMedia768 = useMedia("(max-width: 768px)");
  const isMedia1200 = useMedia("(max-width: 1200px)");

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = () => {
    console.log(toggleSearch);
    setToggleSearch(!toggleSearch);
  };

  return (
    <>
      {isClient && (
        <header className="bg-black h-24 px-8 py-6 max-md:px-4 ">
          <Container className="flex justify-between items-center h-full">
            {!isMedia768 ? (
              <div className="flex items-center gap-6">
                <Link href="/">
                  <Image
                    src="img/logo.svg"
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
                <Search
                  onClick={() => handleSearch()}
                  className={` hover:text-blue-500 z-10 cursor-pointer duration-200 ${
                    toggleSearch ? "text-blue-500" : "text-white"
                  }`}
                />
              </div>
            )}
            {isMedia768 && (
              <Link href="/">
                <Image
                  src="img/logo.svg"
                  alt="logo"
                  width={80}
                  height={33}
                  className={`${toggleSearch ? "max-md:hidden" : ""}`}
                />
              </Link>
            )}
            {!toggleSearch && !isMedia1200 && <NavBarTop />}
            <HeaderExecutions
              toggleSearch={toggleSearch}
              handleSearch={handleSearch}
            />
          </Container>
        </header>
      )}
    </>
  );
};
