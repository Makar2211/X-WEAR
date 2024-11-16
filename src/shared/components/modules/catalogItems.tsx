"use client";
import { cn } from "../../lib/utils";
import { Product } from "@prisma/client";
import {CatalogHeader, CustomPagination,  ProductItem} from "../elements";
import React from "react";
import {usePagination} from "@/shared/hooks";

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
    const { startIndex, endIndex, setStartIndex, setEndIndex, currentPage, totalPages, handlePageChange  } = usePagination({products, rowsPerPage})

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
            url_secrtion="clothes"
            item={product}
          />
        ))}
      </div>
      {products.length > rowsPerPage && (
        <CustomPagination
          /* className="absolute bottom-4 left-1/2" */
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
        />
      )}
    </section>
  );
};
