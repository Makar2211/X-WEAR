import { cn } from "../../lib/utils";
import React, { FormEventHandler } from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
  title: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const FormContainer: React.FC<Props> = ({
  className,
  children,
  onSubmit,
  title,
}) => {
  return (
    <form
      className={cn(
        "max-w-[665px] rounded border-[1px] border-[#E9EAEE] p-5 mx-auto mt-10 mb-10",
        className
      )}
      onSubmit={onSubmit}
    >
      <h4 className="font-bold text-2xl text-[#303030] mb-2">
        {title.toLocaleUpperCase()}
      </h4>
      {children}
    </form>
  );
};
