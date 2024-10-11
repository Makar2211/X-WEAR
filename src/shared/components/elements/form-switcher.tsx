import React from "react";
import { cn } from "../../lib/utils";
import Link from "next/link";

interface Props {
  className?: string;
  text: string;
  route: string;
  routeTitle: string;
}

export const FormSwitcher: React.FC<Props> = ({
  className,
  text,
  route,
  routeTitle,
}) => {
  return (
    <span
      className={cn(
        className,
        "flex justify-end items-end mb-3 gap-2 text-[#CDCFDB] mr-2"
      )}
    >
      {text}
      <Link className="text-black font-semibold hover:underline" href={route}>
        {routeTitle}
      </Link>
    </span>
  );
};
