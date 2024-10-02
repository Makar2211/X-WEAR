"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { CategoryProduct } from "@prisma/client";
import { cn } from "../../../lib/utils";

interface Props {
  className?: string;
  category: CategoryProduct[];
  loading?: boolean;
  values: Set<string>;
  onClickCategory: (name: string) => void;
}

export const CategoryFilter: React.FC<Props> = ({
  className,
  category,
  loading,
  values,
  onClickCategory,
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn(
        "w-full border border-[#E6E7EB] rounded-[6px]  py-2",
        className
      )}
    >
      <AccordionItem value="categoty" className="border-b-[0px]">
        <AccordionTrigger className="flex items-center justify-between font-black text-[14px] px-5 text-black">
          КАТЕГОРИИ
        </AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col gap-1">
            {category.map((item) => (
              <li
                onClick={() => onClickCategory(item.url)}
                className={`font-semibold  px-5 text-[14px] h-[50px] cursor-pointer flex items-center ${
                  values.has(item.url) ? "bg-blue-500 text-white" : ""
                }`}
                key={item.id}
              >
                {item.name}
                <span className={values.has(item.url) ? "font-bold" : ""} />
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
