"use client";
import React from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../ui/accordion";
import { navBar } from "../../../constants";

interface Props {}

export const MobileMenu: React.FC<Props> = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="px-0 mr-3 max-sm:mr-1">
          <Menu className="text-white cursor-pointer" size={30} />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-black">
        <Accordion type="single" collapsible className="w-full mt-5">
          {navBar.map((item, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-white">
                {item.name}
              </AccordionTrigger>
              <AccordionContent className="text-white ml-3">
                <ul className="flex flex-col gap-3">
                  {item.items.map((component) => (
                    <li key={component.href}>
                      <Link
                        className=" font-[600] text-white hover:text-blue-500 scale-x-0"
                        key={component.href}
                        href={component.href}
                      >
                        {component.name}
                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SheetContent>
    </Sheet>
  );
};
