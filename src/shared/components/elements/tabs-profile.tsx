"use client";
import React from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs";
import Image from "next/image";
import {LogOut} from "./log-out";
import {EditProfile, MyDeliveres, MyProfile} from "./profile";
import {cn} from "../../lib/utils";
import {signOut} from "next-auth/react";
import {useMedia} from "react-use";

interface Props {
    className?: string;
}

export const TabsProfile: React.FC<Props> = ({className}) => {
    const isMedia1024 = useMedia("(max-width: 1023px)");
    return (
        <Tabs
            defaultValue="account"
            className={cn(
                "flex justify-start items-start gap-5 mt-5 max-lg:flex-col",
                className
            )}
        >
            <TabsList
                className="flex w-[320px] flex-col gap-5 py-3 items-start rounded border border-[#E9EAEE] relative max-lg:w-full max-lg:flex-row max-lg:overflow-auto max-lg:scrollbar max-lg:gap-10 max-lg:ml-2">
                <TabsTrigger
                    value="account"
                    className={`${
                        isMedia1024
                            ? "items-tabs-trigger w-full gap-1"
                            : "profile-tabs-trigger"
                    }`}
                >
                    <Image
                        src="/profile/profile-account.svg"
                        width={19}
                        height={19}
                        alt="account"
                    />
                    <span className=" text-black">Мой аккаунт</span>
                </TabsTrigger>
                <TabsTrigger
                    value="edit"
                    className={`${
                        isMedia1024
                            ? "items-tabs-trigger w-full gap-1"
                            : "profile-tabs-trigger"
                    }`}
                >
                    <Image
                        src="/profile/profile-edit.svg"
                        width={19}
                        height={19}
                        alt="edit"
                    />
                    <span className=" text-black">Редактировать профиль</span>
                </TabsTrigger>
                <TabsTrigger
                    value="history"
                    className={`${
                        isMedia1024
                            ? "items-tabs-trigger w-full gap-1"
                            : "profile-tabs-trigger"
                    }`}
                >
                    <Image
                        src="/profile/profile-history.svg"
                        width={19}
                        height={19}
                        alt="history"
                    />
                    <span className=" text-black">История заказов</span>
                </TabsTrigger>

                <TabsTrigger
                    value="addresses"
                    className={`${
                        isMedia1024
                            ? "items-tabs-trigger w-full gap-1"
                            : "profile-tabs-trigger"
                    }`}
                >
                    <Image
                        src="/profile/profile-addresses.svg"
                        width={19}
                        height={19}
                        alt="addresses"
                    />
                    <span className=" text-black">Адреса</span>
                </TabsTrigger>
                <TabsTrigger
                    value="edit-addresses"
                    className={`${
                        isMedia1024
                            ? "items-tabs-trigger w-full gap-1"
                            : "profile-tabs-trigger"
                    }`}
                >
                    <Image
                        src="/profile/profile-edit-addresses.svg"
                        width={19}
                        height={19}
                        alt="edit-addresses"
                    />
                    <span className=" text-black">Редактировать адреса</span>
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => signOut({callbackUrl: "/"})}
                    value="logout"
                    className={`${
                        isMedia1024
                            ? "items-tabs-trigger w-full gap-1"
                            : "profile-tabs-trigger"
                    }`}
                >
                    <LogOut/>
                </TabsTrigger>
            </TabsList>
            <TabsContent className="w-full" value="account">
                <MyProfile/>
            </TabsContent>
            <TabsContent className="w-full" value="edit">
                <EditProfile/>
            </TabsContent>
            <TabsContent className="w-full" value="history">
                <MyDeliveres isPage={true}/>
            </TabsContent>
        </Tabs>
    );
};
