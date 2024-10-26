import React from "react";
import { cn } from "../../lib/utils";
import { Skeleton } from "@/shared/components/ui/skeleton";

interface Props {
  className?: string;
}

export const CartItemSkeleton: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "w-1/2 flex justify-between items-center max-lg:w-[70%] max-md:w-[90%] max-sm:w-[95%]",
        className
      )}
    >
      <Skeleton className="w-[150px] h-[150px] rounded" />
      <Skeleton className="w-14 h-14 rounded" />
      <Skeleton className="w-5 h-5 rounded-full " />
    </div>
  );
};
