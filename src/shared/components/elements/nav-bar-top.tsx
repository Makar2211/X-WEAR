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
import { navBar } from "@/shared/constants";

interface Props {
  className?: string;
}

export const NavBarTop: React.FC<Props> = ({ className }) => {
  return (
    <NavigationMenu className="flex items-center justify-between border-none shadow-none">
      <NavigationMenuList className="gap-10">
        {navBar.map((item) => (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuTrigger className="text-white font-bold">
              {item.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-black">
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[625px] ">
                {item.items.map((component) => (
                  <div key={component.href} className="relative group">
                    <Link
                      className=" font-[600] text-white hover:text-blue-500 scale-x-0"
                      key={component.href}
                      href={component.href}
                    >
                      {component.name}
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                    </Link>
                  </div>
                ))}
              </ul>
              <hr />
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
