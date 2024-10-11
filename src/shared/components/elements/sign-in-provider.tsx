"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { cn } from "../../lib/utils";
import { RedirectableProviderType } from "next-auth/providers/index";

interface Props {
  className?: string;
  img: string;
  provider: "google" | "github";
}

export const SignInProvider: React.FC<Props> = ({
  className,
  provider,
  img,
}) => {
  const handleProvider = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(provider);
  };
  return (
    <button
      className={cn(
        className,
        "bg-[#F9F9F9] p-3 rounded-[7px] hover:opacity-70"
      )}
      onClick={(e) => handleProvider(e)}
    >
      <Image src={img} width={20} height={20} alt="google" />
    </button>
  );
};
