"use client";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { TabsTrigger } from "../ui/tabs";
import Image from "next/image";
import { cn } from "../../lib/utils";

interface Props {
  className?: string;
}

export const LogOut: React.FC<Props> = ({ className }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  return (
    <>
      <Image
        src="/profile/profile-log-out.svg"
        width={19}
        height={19}
        alt="logout"
      />
      <button>Выйти</button>
    </>
  );
};
