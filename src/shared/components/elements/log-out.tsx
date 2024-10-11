"use client"
import { signOut } from "next-auth/react";
import React from "react";

interface Props {
  className?: string;
}

export const LogOut: React.FC<Props> = ({ className }) => {
  return <button onClick={() => signOut({ callbackUrl: "/" })}>Выйти</button>;
};
