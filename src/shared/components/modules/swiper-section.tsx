import { ArrowRight } from "lucide-react";
import React from "react";
import { Container, SwiperBlog, SwiperItems } from "../elements";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { Product } from "@prisma/client";

interface IPropsBlog {
  id: number;
  imageUrl: string;
  title: string;
  desc: string;
}

interface Props {
  className?: string;
  title: string;
  url: string;
  more: string;
  items: Product[] | IPropsBlog[];
}

export const SwiperSection: React.FC<Props> = ({
  className,
  title,
  url,
  more,
  items,
}) => {
  return (
    <Container className="py-10 px-16 max-lg:py-6 max-lg:px-8 max-[425px]:px-3 max-[425px]:py-4">
      <section className={cn("mt-10", className)}>
        {/* вернхний блок */}
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-[40px] text-black max-sm:text-[30px]">
            {title}
          </h2>
          <div className=" border-b-2 divide-solid border-black">
            <Link
              href={`/${url}`}
              className="flex justify-center items-center gap-3 font-extrabold text-[14px] max-sm:text-[12px]"
            >
              {more.toLocaleUpperCase()}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        {/* нижний блок */}
        {url === "blog" ? (
          <SwiperBlog items={items} url_secrtion={url} />
        ) : (
          <SwiperItems items={items} url_secrtion={url} />
        )}
      </section>
    </Container>
  );
};
