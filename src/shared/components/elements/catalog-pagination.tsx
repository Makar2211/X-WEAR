import { Product } from "@prisma/client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
  rowsPerPage: number;
  startIndex: number;
  setStartIndex: (startIndex: number) => void;
  endIndex: number;
  setEndIndex: (endIndex: number) => void;
  products: Product[];
}

export const CatalogPagination: React.FC<Props> = ({
  className,
  rowsPerPage,
  products,
  startIndex,
  setStartIndex,
  endIndex,
  setEndIndex,
}) => {
  const totalPages = Math.ceil(products.length / rowsPerPage);
  const currentPage = Math.floor(startIndex / rowsPerPage) + 1;

  const handlePageChange = (page: number) => {
    const newStartIndex = (page - 1) * rowsPerPage;
    const newEndIndex = Math.min(newStartIndex + rowsPerPage, products.length);
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
  };
  return (
    <div className={cn("", className)}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                startIndex === 0 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                setStartIndex(startIndex - rowsPerPage);
                setEndIndex(endIndex - rowsPerPage);
              }}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem className="gap-5" key={index}>
              <PaginationLink
                className={`gap-2 font-bold cursor-pointer ${
                  currentPage === index + 1
                    ? "bg-blue-400 text-white rounded"
                    : undefined
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              className={
                endIndex === products.length
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={() => {
                setStartIndex(startIndex + rowsPerPage); //10
                setEndIndex(endIndex + rowsPerPage); //10 + 10 = 20
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
