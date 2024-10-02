import { X } from "lucide-react";
import React from "react";
import { Input } from "../../ui/input";
import { cn } from "../../../lib/utils";

interface Props {
  className?: string;
  resetAllFilters: () => void;
}

export const ResetButton: React.FC<Props> = ({
  className,
  resetAllFilters,
}) => {
  return (
    <button
      className={cn(
        "relative w-full border border-[#E6E7EB] rounded-[6px] mt-5 font-bold mb-5 py-2 cursor-pointer",
        className
      )}
    >
      <X className="absolute top-[17px] left-[22px] " size={17} />
      <Input
        type="button"
        className="border-none p-0 cursor-pointer shadow-none"
        value="Сбросить все фильтры"
        onClick={resetAllFilters}
      />
    </button>
  );
};
