"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {Sheet, SheetContent, SheetTrigger} from "../../ui/sheet";
import {Menu} from "lucide-react";
import {Button} from "../../ui/button";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "../../ui/accordion";
import {navBar} from "../../../constants";
import {getAllFilters} from "@/shared/services";
import {CategoryProduct} from "@prisma/client";
import {useHeaderCategory} from "@/shared/hooks";

interface Props {
}

export const MobileMenu: React.FC<Props> = () => {
    const {sneakers, clothes} = useHeaderCategory()
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="px-0 mr-3 max-sm:mr-1">
                    <Menu className="text-white cursor-pointer" size={30}/>
                </Button>
            </SheetTrigger>
            <SheetContent className="bg-black">
                <Accordion type="single" collapsible className="w-full mt-5">
                    <AccordionItem value='category-sneakers'>
                        <AccordionTrigger className="text-white">
                            Обувь
                        </AccordionTrigger>
                        <AccordionContent className="text-white ml-3">
                            <ul className="flex flex-col gap-3">
                                {sneakers?.map((sneaker: CategoryProduct) => (
                                    <li key={sneaker.id}>
                                        <Link
                                            className=" font-[600] text-white hover:text-blue-500 scale-x-0"
                                            key={sneaker.id}
                                            href={`sneakers?category=${sneaker.url}`}

                                        >
                                            {sneaker.name}
                                            <span
                                                className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='category-clothes'>
                        <AccordionTrigger className="text-white">
                            Одежда
                        </AccordionTrigger>
                        <AccordionContent className="text-white ml-3">
                            <ul className="flex flex-col gap-3">
                                {clothes?.map((sneaker: CategoryProduct) => (
                                    <li key={sneaker.id}>
                                        <Link
                                            className=" font-[600] text-white hover:text-blue-500 scale-x-0"
                                            key={sneaker.id}
                                            href={`clothes?category=${sneaker.url}`}

                                        >
                                            {sneaker.name}
                                            <span
                                                className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value='category-info'>
                        <AccordionTrigger className="text-white">
                            Информация
                        </AccordionTrigger>
                        <AccordionContent className="text-white ml-3">
                            <ul className="flex flex-col gap-3">
                                {clothes?.map((sneaker: CategoryProduct) => (
                                    <li key={sneaker.id}>
                                        <Link
                                            className=" font-[600] text-white hover:text-blue-500 scale-x-0"
                                            key={sneaker.id}
                                            href={`clothes?category=${sneaker.url}`}

                                        >
                                            {sneaker.name}
                                            <span
                                                className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>

                    <Link href='/' className=" font-[500] text-sm text-white py-4 hover:text-blue-500 ">Расчет
                        стоимости
                    </Link>
                </Accordion>
            </SheetContent>
        </Sheet>
    );
};
