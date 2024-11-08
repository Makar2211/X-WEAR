import React from "react";
import { Checkout, Product} from "@prisma/client";

interface IPropsPagination {
    products: (Product | Checkout)[];
    rowsPerPage: number
}

interface IReturnPagination {
    rowsPerPage: number;
    startIndex: number;
    setStartIndex: (startIndex: number) => void;
    endIndex: number;
    setEndIndex: (endIndex: number) => void;
    totalPages: number;
    currentPage: number
    handlePageChange: (page: number) => void
}

export const usePagination = ({products, rowsPerPage}: IPropsPagination): IReturnPagination => {

    const [startIndex, setStartIndex] = React.useState<number>(0);
    const [endIndex, setEndIndex] = React.useState<number>(rowsPerPage);
    const totalPages = Math.ceil(products.length / rowsPerPage);
    const currentPage = Math.floor(startIndex / rowsPerPage) + 1;
    const handlePageChange = (page: number) => {
        const newStartIndex = (page - 1) * rowsPerPage;
        const newEndIndex = Math.min(newStartIndex + rowsPerPage, products.length);
        setStartIndex(newStartIndex);
        setEndIndex(newEndIndex);
    };

    return {
        rowsPerPage,
        startIndex,
        setStartIndex,
        endIndex,
        setEndIndex,
        totalPages,
        currentPage,
        handlePageChange,
    }

}