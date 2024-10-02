"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Slider } from "../../ui/slider";
import { cn } from "@/shared/lib/utils";
import { Input } from "../../ui/input";
import { IPriceProps } from "@/shared/hooks/useFilter";

interface Props {
  className?: string;
  values: IPriceProps;
  onChangePrice: (name: keyof IPriceProps, value: number) => void;
  setPrice: (newPrice: IPriceProps) => void;
}

export const FilterPrice: React.FC<Props> = ({
  className,
  values,
  onChangePrice,
  setPrice,
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full border border-[#E6E7EB] rounded-[6px] px-5 py-2 mt-5"
    >
      <AccordionItem value="categoty" className="border-b-[0px]">
        <AccordionTrigger className="flex items-center justify-between font-black text-[14px] text-black">
          ФИЛЬТР ПО ЦЕНЕ
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex justify-between items-center mb-5">
            <Input
              placeholder="0"
              value={values.priceFrom}
              className="text-center text-[#67708A] bg-[#F8FAFB] rounded border-none"
              onChange={(e) =>
                onChangePrice("priceFrom", Number(e.target.value))
              }
            />
            <span>—</span>
            <Input
              placeholder="10000"
              value={values.priceTo}
              className="text-center text-[#67708A] bg-[#F8FAFB] rounded border-none"
              onChange={(e) => onChangePrice("priceTo", Number(e.target.value))}
            />
          </div>
          <Slider
            max={10000}
            minStepsBetweenThumbs={1}
            min={0}
            step={10}
            value={[
              Number(values.priceFrom) || 0,
              Number(values.priceTo) || 10000,
            ]}
            onValueChange={([from, to]) =>
              setPrice({ priceFrom: from.toString(), priceTo: to.toString() })
            }
            formatLabel={(value) => `${value}`}
            className="pb-2"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
