"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import Image from "next/image";
import { LogOut } from "../log-out";
import Link from "next/link";
import { EditProfile } from "./edit-profile";
import { useGetUser } from "@/shared/hooks";
import { signOut } from "next-auth/react";

interface Props {
  className?: string;
}

export const MyProfile: React.FC<Props> = ({ className }) => {
  const { user } = useGetUser();
  return (
    <div className={className}>
      <h3 className="text-[22px] font-semibold mb-3">
        {user?.name === undefined
          ? "Приветствуем, незнакомец!"
          : `Приветствуем, ${user?.name}!`}
      </h3>
      <Tabs>
        <TabsList className="grid w-full grid-cols-3 grid-rows-2 gap-5 max-md:grid-cols-2">
          <TabsTrigger value="account" className="my-profile-tabs-trigger ">
            <Image
              src="/profile/profile-account.svg"
              width={19}
              height={19}
              alt="account"
            />
            <span className=" text-black">Мой аккаунт</span>
          </TabsTrigger>

          <TabsTrigger value="orders" className="my-profile-tabs-trigger ">
            <Image
              src="/profile/profile-order.svg"
              width={19}
              height={19}
              alt="orders"
            />
            <span className=" text-black">Мои заказы</span>
          </TabsTrigger>
          <TabsTrigger value="addresses" className="my-profile-tabs-trigger">
            <Image
              src="/profile/profile-addresses.svg"
              width={19}
              height={19}
              alt="addresses"
            />
            <span className=" text-black">Адреса</span>
          </TabsTrigger>
          <TabsTrigger value="edit" className="my-profile-tabs-trigger">
            <Image
              src="/profile/profile-edit.svg"
              width={19}
              height={19}
              alt="edit"
            />
            <span className=" text-black">Редактировать профиль</span>
          </TabsTrigger>
          <TabsTrigger
            value="edit-addresses"
            className="my-profile-tabs-trigger"
          >
            <Link
              href="/favourites"
              className="flex flex-col justify-center items-center"
            >
              <Image
                src="/profile/profile-edit-addresses.svg"
                width={19}
                height={19}
                alt="edit-addresses"
              />
              <span className=" text-black">Избранные товары</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger
            value="logout"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="my-profile-tabs-trigger "
          >
            <LogOut />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <EditProfile />
        </TabsContent>
      </Tabs>
    </div>
  );
};
