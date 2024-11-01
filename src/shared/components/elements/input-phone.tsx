"use client";
import React, { HTMLInputTypeAttribute, useRef } from "react";
import { Input } from "../ui/input";
import { UseFormRegisterReturn } from "react-hook-form";
import { InputMask, useMask } from "@react-input/mask";
import { cn } from "@/shared/lib/utils";

interface InputProps {
  label: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  errorMessage?: string;
  register: UseFormRegisterReturn;
  className?: string;
}

export const PhoneInput: React.FC<InputProps> = ({
  label,
  placeholder,
  type,
  errorMessage,
  register,
  className,
}) => {
  return (
    <div className={cn("mb-6 relative", className)}>
      <label className="block w-full bg-[#F9F9F9] px-4 rounded relative">
        <span className=" block pt-2 mb-[-10px] text-gray-700">{label}</span>
        <InputMask
          className="w-full p-0 rounded border-none shadow-none border-[#E9EAEE] flex h-9  border border-input bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none"
          placeholder={placeholder}
          mask="+38 (___) __-__-___"
          replacement={{ _: /\d/ }}
          {...register}
          type={type}
        />
      </label>
      <p className="absolute bottom-[-20px] text-red-600 font-bold  ml-1">
        {errorMessage}
      </p>
    </div>
  );
};
