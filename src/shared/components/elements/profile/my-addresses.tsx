import React, {useEffect, useState} from 'react';
import {Adress, User} from "@prisma/client";
import {usePagination} from "@/shared/hooks";
import {CircleX, Frown} from "lucide-react";
import {CustomPagination} from "@/shared/components/elements";
import toast from "react-hot-toast";
import {Button} from "@/shared/components/ui/button";

interface IPropsMyAddresses {
    isPage: boolean
}

export interface Address {
    id: number;
    apartment: string;
    city: string;
    country: string;
    createdAt: string;
    index: string;
    name_of_company?: string;
    neighborhoods?: string;
    street: string;
    updatedAt: string;
    userId: number;
    user: User;
}


export const MyAddresses: React.FC<IPropsMyAddresses> = ({isPage}) => {
    const [addresses, setAddresses] = useState<Address[]>([])
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/addresses/get`)
                if (!response.ok) {
                    throw new Error()
                }
                const data = await response.json()
                setAddresses(data)

            } catch (e) {
                console.error("Ошибка получении адресов", e)
            } finally {
                setLoading(false)
            }
        })()
    }, [])


    const onDeleteAddress = async(id: number) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/addresses/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error()
        }
        const data = await response.json()

        toast.success(data)
        setAddresses((prevAddresses) => prevAddresses.filter(address => address.id !== id))
    }
    const {startIndex, endIndex, currentPage, rowsPerPage, totalPages, handlePageChange} = usePagination({ products: addresses, rowsPerPage: 2 })
    return (
        <div>
            {isPage && <h3 className="text-[22px] font-semibold mb-3">Мои адреса</h3>}
            {
                addresses.length ? (
                    <>
                        <div className='flex justify-between  gap-5 min-h-[340px] max-[870px]:flex-col '>
                            {
                                addresses.slice(startIndex, endIndex).map((address: Address) => (
                                    <div key={address.id} className='relative flex flex-col relative w-1/2 rounded border-[1px] border-[#E9EAEE] p-6 gap-3 max-[870px]:w-full max-[870px]:min-h-[300px] max-sm:p-2'>
                                        <span className='font-bold text-[19px]'>{address.user.name} {address.user.last_name}</span>
                                        <span
                                            className="inline-block max-w-[280px] break-words whitespace-normal">{address.index}, {address.city}, {address.country}, {address.street}, кв{address.apartment}</span>

                                        <div className='flex flex-col'>
                                            <span className='text-[#87878D]'>Телефон</span>
                                            <span>{address.user.phone}</span>
                                        </div>


                                        <div className='flex flex-col'>
                                            <span className='text-[#87878D]'>Email</span>
                                            <span>{address.user.email}</span>
                                        </div>

                                        <span className='absolute flex items-center justify-center top-0 right-0 rounded border bg-[#E9EAEE] w-[200px] h-10  font-extrabold'>Адрес доставки #{address.id}</span>
                                        {isPage && (
                                            <button onClick={() => onDeleteAddress(address.id)}
                                                    className='absolute flex items-center justify-center gap-1 w-[220px] h-10 bottom-0 left-0 rounded border-[1px] border-[#E9EAEE]'>
                                                <CircleX/>
                                                <span className='font-semibold'>Удалить</span>
                                            </button>
                                        )}

                                    </div>
                                ))
                            }
                        </div>
                        {addresses.length > rowsPerPage && isPage && (
                            <CustomPagination
                                className={"mt-4 justify-start items-start"}
                                currentPage={currentPage}
                                handlePageChange={handlePageChange}
                                totalPages={totalPages}
                            />
                        )}
                    </>
                ) : (
                    <div className='flex flex-col items-center justify-center mt-5'>
                        <Frown size={100}/>
                        <span className='mt-5 font-bold text-2xl'>У вас ещё нет адрессов доставки</span>
                    </div>
                )
            }

        </div>
    );
};
