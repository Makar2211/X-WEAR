"use client";
import { cn } from "@/shared/lib/utils";
import { Product } from "@prisma/client";
import { CatalogHeader, CatalogPagination, ProductItem } from "../elements";
import React from "react";

interface Props {
  className?: string;
  title: string;
  products: Product[];
  loading?: boolean;
}

export const CatalogItems: React.FC<Props> = ({
  className,
  title,
  products,
  loading,
}) => {
  const rowsPerPage = 9;
  const [startIndex, setStartIndex] = React.useState(0);
  const [endIndex, setEndIndex] = React.useState(rowsPerPage);

  return (
    <section className={cn("w-full  relative", className)}>
      <CatalogHeader
        title={title}
        products={products}
        className="max-md:hidden"
      />
      <div className="mt-5 grid grid-cols-3 gap-5 max-[1024px]:grid-cols-2">
        {products.slice(startIndex, endIndex).map((product) => (
          <ProductItem
            key={product.id}
            url_secrtion="sneakers"
            item={product}
          />
        ))}
      </div>
      {products.length > rowsPerPage && (
        <CatalogPagination
          /* className="absolute bottom-4 left-1/2" */
          rowsPerPage={rowsPerPage}
          startIndex={startIndex}
          setStartIndex={setStartIndex}
          endIndex={endIndex}
          setEndIndex={setEndIndex}
          products={products}
        />
      )}
    </section>
  );
};
