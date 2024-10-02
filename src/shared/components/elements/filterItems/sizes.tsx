import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Size } from "@prisma/client";

interface Props {
  className?: string;
  size: Size[];
  loading?: boolean;
  values: Set<string>;
  onClickCheckbox: (name: string) => void;
}

export const Sizes: React.FC<Props> = ({
  className,
  size,
  loading,
  values,
  onClickCheckbox,
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border border-[#E6E7EB] rounded-[6px] px-5 py-2 mt-5"
    >
      <AccordionItem value="categoty" className="border-b-[0px]">
        <AccordionTrigger className="flex items-center justify-between font-black text-[14px] text-black">
          РАЗМЕРЫ (EU)
        </AccordionTrigger>
        <AccordionContent>
          <ul className="grid grid-cols-3 gap-2 gap-row-2 grid-rows-6 items-center">
            {size.map((item) => (
              <li
                onClick={() => onClickCheckbox(item.size.toString())}
                className={`font-bold text-center text-[14px] border border-[#EFEFEF] rounded p-2 cursor-pointer ${
                  values.has(item.size.toString())
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                key={item.id}
              >
                {item.size}
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
