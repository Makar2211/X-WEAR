"use client";

import * as React from "react";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {navBar} from "../../constants";
import {useHeaderCategory} from "@/shared/hooks";

interface Props {
    className?: string;
}

export const NavBarTop: React.FC<Props> = ({className}) => {
    const {sneakers, clothes} = useHeaderCategory()
    return (
        <NavigationMenu className="flex items-center justify-between border-none shadow-none">
            <NavigationMenuList className="gap-10">
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-white font-bold">
                        Обувь
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-black">
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[625px] ">
                            {sneakers?.map((sneaker) => (
                                <div key={sneaker.id} className="relative group">
                                    <Link
                                        className=" font-[600] text-white hover:text-blue-500 scale-x-0"
                                        key={sneaker.id}
                                        href={`sneakers?category=${sneaker.url}`}
                                    >
                                        {sneaker.name}
                                        <span
                                            className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                    </Link>
                                </div>
                            ))}

                        </ul>
                        <hr/>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-white font-bold">
                        Одежда
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-black">
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[625px] ">
                            {clothes?.map((clothes) => (
                                <div key={clothes.id} className="relative group">
                                    <Link
                                        className=" font-[600] text-white hover:text-blue-500 scale-x-0"
                                        key={clothes.id}
                                        href={`clothes?category=${clothes.url}`}
                                    >
                                        {clothes.name}
                                        <span
                                            className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                    </Link>
                                </div>
                            ))}

                        </ul>
                        <hr/>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <Link href='/' className='text-white font-bold'> Расчет стоимости</Link>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-white font-bold">
                        Информация
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-black">
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[625px] ">
                            {clothes?.map((clothes) => (
                                <div key={clothes.id} className="relative group">
                                    <Link
                                        className=" font-[600] text-white hover:text-blue-500 scale-x-0"
                                        key={clothes.id}
                                        href={`clothes?category=${clothes.url}`}
                                    >
                                        {clothes.name}
                                        <span
                                            className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                                    </Link>
                                </div>
                            ))}

                        </ul>
                        <hr/>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};
