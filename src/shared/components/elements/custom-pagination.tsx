"use client"
import {Product} from "@prisma/client";
import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import {cn} from "../../lib/utils";
import {usePagination} from "@/shared/hooks";

interface Props {
    className?: string;
    totalPages: number;
    currentPage: number
    handlePageChange: (page: number) => void

}

export const CustomPagination: React.FC<Props> = ({
                                                       className,
                                                       totalPages,
                                                       currentPage, handlePageChange

                                                   }) => {


    return (
            <Pagination className={cn("", className)}>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            className={
                                currentPage === 1 ? "pointer-events-none opacity-50" : undefined
                            }
                            onClick={() => {
                                if (currentPage > 1) {
                                    handlePageChange(currentPage - 1);
                                }
                            }}
                        />
                    </PaginationItem>

                    {Array.from({length: totalPages}, (_, index) => (
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
                                currentPage === totalPages
                                    ? "pointer-events-none opacity-50"
                                    : undefined
                            }
                            onClick={() => {
                                if (currentPage < totalPages) {
                                    handlePageChange(currentPage + 1);
                                }
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
    );
};