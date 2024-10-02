import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Checkbox } from "../../ui/checkbox";
import { Product } from "@prisma/client";

interface Props {
  values: Set<string>;
  models: Product[];
  loading?: boolean;
  onClickCheckbox: (name: string) => void;
  className?: string;
}

export const Models: React.FC<Props> = ({
  className,
  models,
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
          МОДЕЛЬ
        </AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col gap-6 max-h-[275px] scrollbar overflow-auto mr-[6px]">
            {models.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2 justify-start cursor-pointer"
              >
                <Checkbox
                  id={`checkbox-${item.name}-${item.id}`}
                  checked={values.has(item.name)}
                  onCheckedChange={() => onClickCheckbox(item.name)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor={`checkbox-${item.name}-${item.id}`}
                    className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.name}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
