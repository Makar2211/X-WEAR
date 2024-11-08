"use client"
import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/components/ui/table";
import {Checkout} from "@prisma/client";
import {usePagination} from "@/shared/hooks";
import {CustomPagination} from "@/shared/components/elements";

interface IPropsMyProfile {
    isPage: boolean
}
export const MyDeliveres: React.FC<IPropsMyProfile> = ({isPage}) => {
    const [checkout, setAddresses] = useState<Checkout[]>([])

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/addresses`)
                if (!response.ok) {
                    throw new Error()
                }
                const data = await response.json()
                setAddresses(data)
            } catch (e) {
                console.error("Ошибка получении заказов", e)
            }
        })()
    }, [])
    const {startIndex, endIndex, currentPage, rowsPerPage, totalPages, handlePageChange} = usePagination({ products: checkout, rowsPerPage: 4 })
    return (
        <div>
            <h3 className="text-[22px] font-semibold mb-3">История заказов</h3>
           <div className='relative rounded border-[1px] border-[#E9EAEE] px-6 py-3 max-[465px]:px-1'>
               <Table >
                   <TableHeader>
                       <TableRow>
                           <TableHead className='uppercase font-bold'>
                               Номер
                           </TableHead>
                           <TableHead className='uppercase font-bold'>
                               Дата
                           </TableHead>
                           <TableHead className='uppercase font-bold'>
                               Статус
                           </TableHead>
                           <TableHead className='text-end uppercase font-bold'>
                               Итог
                           </TableHead>
                       </TableRow>
                   </TableHeader>
                   <TableBody >
                       {checkout.slice(startIndex, endIndex).map((checkout: Checkout, index) => (
                           <TableRow className={`border-separate ${index % 2 === 0 && 'rounded bg-[#E9EAEE]  border border-[#EBEBEB]'}`} key={checkout.id}>
                               <TableCell className="font-medium p-4">#{checkout.id}</TableCell>
                               <TableCell>{new Date(checkout.createdAt).toLocaleString('ru-RU', {
                                   day: '2-digit',
                                   month: '2-digit',
                                   year: 'numeric',
                               })}</TableCell>
                               <TableCell>{checkout.status}</TableCell>
                               <TableCell className="text-right font-bold">{checkout.totalAmountCart} ₴</TableCell>
                           </TableRow>
                       ))}
                   </TableBody>
               </Table>
               {
                   isPage && (
                       <CustomPagination
                           className={ "mt-4 justify-start items-start"}
                           currentPage={currentPage}
                           handlePageChange={handlePageChange}
                           totalPages={totalPages}
                       />
                   )

               }

           </div>
        </div>
    );
};
