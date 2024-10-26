import { cn } from "../../lib/utils";
import { Product } from "@prisma/client";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
  url_secrtion: string;
  item: Product;
}

const imageStryle = {
  width: "100%",
  heigth: "100%",
};

export const ProductItem: React.FC<Props> = ({
  className,
  url_secrtion,
  item,
}) => {
  return (
    <Link
      href={`/${url_secrtion}/${item.id}`}
      className={cn("flex flex-col items-start", className)}
      key={item.id}
    >
      <div className="relative w-full">
        <Image
          src={item.imageUrl[0]}
          alt={item.name}
          width={300}
          height={300}
          style={imageStryle}
        />
        <Star className="absolute top-3 right-3 cursor-pointer" />
      </div>

      <div className="flex flex-col items-start">
        <b>{item.name}</b>
        <div className="text-primary">{item.price} UAH</div>
      </div>
    </Link>
  );
};
