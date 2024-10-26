"use client";
import React, { HTMLInputTypeAttribute } from "react";
import { Input } from "../ui/input";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  errorMessage?: string;
  register: UseFormRegisterReturn;
}

export const CustomInput: React.FC<InputProps> = ({
  label,
  placeholder,
  type,
  errorMessage,
  register,
}) => {
  return (
    <div className="mb-6 relative">
      <label className="block w-full bg-[#F9F9F9] px-4 rounded relative">
        <span className=" block pt-2 mb-[-10px] text-gray-700">{label}</span>
        <Input
          className="w-full p-0 rounded border-none shadow-none border-[#E9EAEE] focus:outline-none"
          placeholder={placeholder}
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
