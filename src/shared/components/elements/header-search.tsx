"use client";
import React, { useRef } from "react";
import { useClickAway, useDebounce, useMedia } from "react-use";
import { cn } from "../../lib/utils";
import { Input } from "../ui/input";
import { CircleX } from "lucide-react";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useCategoryProduct } from "../../hooks/use-category-product";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  setToggleSearch?: (toggleSearch: boolean) => void;
}

export const HeaderSearch: React.FC<Props> = ({
  className,
  setToggleSearch,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedProductId, setSelectedProductId] = React.useState<
    number | null
  >(null);
  const [categoryId, setCategoryId] = React.useState<number | null>(null);
  const [focused, setFocused] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const ref = useRef(null);

  // Fetch the category URL when a categoryId is set
  const categoryUrl = useCategoryProduct(categoryId ?? 0);
  useClickAway(ref, () => {
    setFocused(false);
    if (setToggleSearch) {
      setToggleSearch(false);
    }
  });

  useDebounce(
    async () => {
      try {
        const items = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/search?search=${searchQuery}`
        ).then((res) => res.json());
        setProducts(items);
      } catch (error) {
        console.error(error);
      }
    },
    400,
    [searchQuery, focused]
  );

  React.useEffect(() => {
    if (categoryUrl && selectedProductId) {
      router.push(`/${categoryUrl}/${selectedProductId}`);
      setCategoryId(null);
    }
  }, [categoryUrl, selectedProductId]);

  const onClickItem = (categoryId: number, id: number) => {
    setSelectedProductId(id);
    setCategoryId(categoryId);
    setFocused(false);
    setSearchQuery("");
    if (setToggleSearch) {
      setToggleSearch(false);
    }
    setProducts([]);
  };

  const isMedia768 = useMedia("(max-width: 768px)");
  return (
    <div
      ref={ref}
      className={cn(
        "relative  w-[65%] max-[1200px]:w-[60%] max-lg:w-[70%] max-md:w-full",
        className
      )}
    >
      <Input
        onFocus={() => setFocused(true)}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={`${isMedia768 ? "Поиск" : "Поиск по каталогу товаров"}`}
        className={cn(
          "p-4 text-[#FFFFFF] w-full h-12 rounded-3xl bg-black border-[#FFFFFF1C]",
          focused && "rounded-b-none"
        )}
      />
      <CircleX
        onClick={() => setSearchQuery("")}
        className="absolute top-[12px] right-4 text-[#FFFFFF1C] hover:text-blue-500 cursor-pointer duration-200"
      />
      {products.length > 0 && (
        <div
          className={cn(
            "absolute w-full border bg-black  text-white rounded-3xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            focused && "visible opacity-100 top-12",
            products.length && "rounded-t-none"
          )}
        >
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => onClickItem(product.categoryId, product.id)}
              className="flex items-center justify-between gap-2 w-full cursor-pointer px-3 py-2 hover:bg-black/10"
            >
              <div className="flex gap-2">
                <Image
                  className="rounded-sm h-8 w-8"
                  src={product.imageUrl[0]}
                  alt={product.name}
                  width={100}
                  height={100}
                />
                <div className="flex items-center gap-3 w-full px-3 py-2">
                  {product.name}
                </div>
              </div>
              <div>{product.price} ₴</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
