"use client";
import React from "react";
import { CustomInput } from "../custom-input";
import { Button } from "../../ui/button";
import { useUpdateUser } from "@/shared/hooks/use-update-user";
import { cn } from "@/shared/lib/utils";
import { PhoneInput } from "../input-phone";

interface Props {
  className?: string;
}

export const EditProfile: React.FC<Props> = ({ className }) => {
  const { userLoading, updateErrors, updateRegister, updateSubmit } =
    useUpdateUser();

  if (!userLoading) {
    return <div>Загрузка данных пользователя...</div>;
  }
  return (
    <div className={cn(className, "")}>
      <h3 className="text-[22px] font-semibold mb-3">Редактирование профиля</h3>
      <form
        onSubmit={updateSubmit}
        className="grid grid-cols-2 grid-rows-2 gap-5"
      >
        <CustomInput
          label="Ваше имя:"
          placeholder="Введите ваше имя"
          register={updateRegister("name")}
          type="text"
          errorMessage={updateErrors?.name?.message}
        />
        <CustomInput
          label="Фамилия:"
          placeholder="Введите вашу фамилию"
          register={updateRegister("last_name")}
          type="text"
          errorMessage={updateErrors?.last_name?.message}
        />
        <CustomInput
          label="Email адрес"
          placeholder="yavasyaivanov@gmail.com"
          register={updateRegister("email")}
          type="email"
          errorMessage={updateErrors?.email?.message}
        />
        <PhoneInput
          label="Номер телефона:"
          placeholder="Введите ваш телефон"
          register={updateRegister("phone")}
          type="phone"
          errorMessage={updateErrors?.phone?.message}
        />

        <Button
          type="submit"
          variant="blackandwhite"
          className="w-[200px]
		h-16"
        >
          СОХРАНИТЬ
        </Button>
      </form>
    </div>
  );
};
