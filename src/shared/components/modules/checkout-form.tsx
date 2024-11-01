"use client";
import React from "react";
import {
  CheckoutSummary,
  CountryInput,
  CustomInput,
  PhoneInput,
} from "../elements";
import { useCart, useCheckout } from "@/shared/hooks";
import { Checkbox } from "../ui/checkbox";

export const CheckoutForm: React.FC = () => {
  const {
    handleSubmitCheckout,
    onSubmitCheckout,
    registerCheckout,
    setValueCheckout,
    errorsCheckout,
    handleCheckbox,
    checkbox,
    items,
    totalAmount,
  } = useCheckout();

  return (
    <div className="flex  justify-start items-start gap-8 mt-10 mb-10">
      <form
        id="checkout-form"
        onSubmit={handleSubmitCheckout(onSubmitCheckout)}
        className="rounded border-[1px] border-[#E9EAEE] p-5 w-[65%] "
      >
        <h3 className="font-bold text-[23px] uppercase text-[#303030] mb-6">
          Платежные реквизиты
        </h3>
        <div className="flex items-center gap-5">
          <CustomInput
            label="Имя:"
            placeholder="Ваше имя"
            register={registerCheckout("name")}
            type="text"
            className="w-full"
            errorMessage={errorsCheckout?.name?.message}
          />
          <CustomInput
            label="Фамилия:"
            placeholder="Ваша фамилия"
            register={registerCheckout("last_name")}
            type="text"
            className="w-full"
            errorMessage={errorsCheckout?.last_name?.message}
          />
        </div>
        <CustomInput
          label="Название компании: (не обязательно)"
          placeholder="Введите название"
          register={registerCheckout("name_of_company")}
          type="text"
          errorMessage={errorsCheckout?.name_of_company?.message}
        />
        <CountryInput
          label="Старана:"
          placeholder="Выбрать страну"
          register={registerCheckout("country")}
          setValue={setValueCheckout}
          type="text"
          errorMessage={errorsCheckout?.street?.message}
        />
        <CustomInput
          label="Улица:"
          placeholder="Введите название улицы"
          register={registerCheckout("street")}
          type="text"
          errorMessage={errorsCheckout?.street?.message}
        />
        <div className="grid grid-cols-2 grid-rows-3 gap-5">
          <CustomInput
            label="Номер дома / квартиры"
            placeholder="Введите номер дома и квартиры"
            register={registerCheckout("apartment")}
            type="text"
            className="w-full"
            errorMessage={errorsCheckout?.apartment?.message}
          />
          <CustomInput
            label="Город"
            placeholder="Ваш город"
            register={registerCheckout("city")}
            type="text"
            className="w-full"
            errorMessage={errorsCheckout?.city?.message}
          />
          <CustomInput
            label="Область / район"
            placeholder="Введите область или район"
            register={registerCheckout("neighborhoods")}
            type="text"
            className="w-full"
            errorMessage={errorsCheckout?.neighborhoods?.message}
          />
          <CustomInput
            label="Индекс"
            placeholder="Введите индекс"
            register={registerCheckout("index")}
            type="text"
            className="w-full"
            errorMessage={errorsCheckout?.index?.message}
          />
          <CustomInput
            label="Email адрес:"
            placeholder="Ваша почта"
            register={registerCheckout("email")}
            type="email"
            className="w-full"
            errorMessage={errorsCheckout?.email?.message}
          />
          <PhoneInput
            label="Номер телефона:"
            placeholder="Ваш номер телефона"
            register={registerCheckout("phone")}
            type="tel"
            className="w-full"
            errorMessage={errorsCheckout?.phone?.message}
          />
        </div>
        <div className="flex gap-2">
          <Checkbox
            checked={checkbox}
            onClick={handleCheckbox}
            id="checkbox-checkout"
          />
          <label className=" cursor-pointer" htmlFor="checkbox-checkout">
            Завести аккаунт?
          </label>
        </div>
      </form>

      <CheckoutSummary items={items} totalAmount={totalAmount} />
    </div>
  );
};
