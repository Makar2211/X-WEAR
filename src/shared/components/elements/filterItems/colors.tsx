import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Color, Size } from "@prisma/client";

interface Props {
  className?: string;
  colors: Color[];
  loading?: boolean;
  values: Set<string>;
  onClickCheckbox: (name: string) => void;
}

export const Colors: React.FC<Props> = ({
  className,
  colors,
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
          ЦВЕТ
        </AccordionTrigger>
        <AccordionContent>
          <ul className="grid grid-cols-3 gap-2 gap-row-2 grid-rows-5 items-center">
            {colors.map((item) => (
              <li
                onClick={() => onClickCheckbox(item.name.toString())}
                className={`font-bold text-center text-[10px] flex flex-col items-center cursor-pointer min-h-[85px] `}
                key={item.id}
              >
                <span
                  className={`w-7 h-7  rounded-full ${
                    values.has(item.name.toString())
                      ? "border-black border-[2px] p-2"
                      : ""
                  }`}
                  style={{ backgroundColor: item.hexColor }}
                />
                {item.name}
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
