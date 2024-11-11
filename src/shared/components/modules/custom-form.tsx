"use client";
import React from "react";
import {
    CheckoutSummary,
    CountryInput,
    CustomInput,
    PhoneInput,
} from "../elements";
import {useCart, useCheckout} from "@/shared/hooks";
import {Checkbox} from "../ui/checkbox";
import {cn} from "@/shared/lib/utils";
import {Button} from "@/shared/components/ui/button";
import {FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {CheckoutData, CheckoutSchema} from "@/shared/types/sheams";
import {IProductsCart} from "@/shared/types";

interface IPropsCheckoutForm {
    handleSubmit: UseFormHandleSubmit<CheckoutData>;
    onSubmit: (data: CheckoutData) => void;
    register: UseFormRegister<CheckoutData>;
    setValue: UseFormSetValue<CheckoutData>;
    error: FieldErrors<CheckoutData>;
    handleCheckbox?: () => void;
    checkbox?: boolean;
    items?: IProductsCart[];
    totalAmount?: number;
    isCheckoutPage: boolean;
    className?: string;
}

export const CustomForm: React.FC<IPropsCheckoutForm> = ({
                                                             isCheckoutPage,
                                                             className,
                                                             items,
                                                             totalAmount,
                                                             handleSubmit,
                                                             onSubmit,
                                                             handleCheckbox,
                                                             checkbox,
                                                             error,
                                                             setValue,
                                                             register
                                                         }) => {


    return (
        <div
            className={`flex justify-start items-start gap-8   max-[1200px]:flex-col ${isCheckoutPage && 'mb-10 mt-10'}`}>
            <form
                id="custom-form"
                onSubmit={handleSubmit(onSubmit)}
                className={cn("rounded border-[1px] border-[#E9EAEE] p-5 w-[65%] max-[1200px]:w-full max-sm:p-2", className)}
            >
                {isCheckoutPage && <h3 className="font-bold text-[23px] uppercase text-[#303030] mb-6">
                    Платежные реквизиты
                </h3>}
                <div className="flex items-center gap-5 max-[650px]:flex-col max-[650px]:gap-0">
                    <CustomInput
                        label="Имя:"
                        placeholder="Ваше имя"
                        register={register("name")}
                        type="text"
                        className="w-full"
                        errorMessage={error?.name?.message}
                    />
                    <CustomInput
                        label="Фамилия:"
                        placeholder="Ваша фамилия"
                        register={register("last_name")}
                        type="text"
                        className="w-full"
                        errorMessage={error?.last_name?.message}
                    />
                </div>
                <CustomInput
                    label="Название компании: (не обязательно)"
                    placeholder="Введите название"
                    register={register("name_of_company")}
                    type="text"
                    errorMessage={error?.name_of_company?.message}
                />
                <CountryInput
                    label="Старана:"
                    placeholder="Выбрать страну"
                    register={register("country")}
                    setValue={setValue}
                    type="text"
                    errorMessage={error?.street?.message}
                />
                <CustomInput
                    label="Улица:"
                    placeholder="Введите название улицы"
                    register={register("street")}
                    type="text"
                    errorMessage={error?.street?.message}
                />
                <div
                    className="grid grid-cols-2 grid-rows-3 gap-5 max-[650px]:grid-cols-1 max-[650px]:grid-rows-6 max-[650px]:gap-0">
                    <CustomInput
                        label="Номер дома / квартиры"
                        placeholder="Введите номер дома и квартиры"
                        register={register("apartment")}
                        type="text"
                        className="w-full"
                        errorMessage={error?.apartment?.message}
                    />
                    <CustomInput
                        label="Город"
                        placeholder="Ваш город"
                        register={register("city")}
                        type="text"
                        className="w-full"
                        errorMessage={error?.city?.message}
                    />
                    <CustomInput
                        label="Область / район"
                        placeholder="Введите область или район"
                        register={register("neighborhoods")}
                        type="text"
                        className="w-full"
                        errorMessage={error?.neighborhoods?.message}
                    />
                    <CustomInput
                        label="Индекс"
                        placeholder="Введите индекс"
                        register={register("index")}
                        type="text"
                        className="w-full"
                        errorMessage={error?.index?.message}
                    />
                    <CustomInput
                        label="Email адрес:"
                        placeholder="Ваша почта"
                        register={register("email")}
                        type="email"
                        className="w-full"
                        errorMessage={error?.email?.message}
                    />
                    <PhoneInput
                        label="Номер телефона:"
                        placeholder="Ваш номер телефона"
                        register={register("phone")}
                        type="tel"
                        className="w-full"
                        errorMessage={error?.phone?.message}
                    />
                </div>
                {isCheckoutPage ? (
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
                ) : (
                    <Button
                        variant="blackandwhite"
                        className="w-[220px] h-[56px] p-0 mb-3"
                        type="submit"
                        form="custom-form"
                    >
                        Сохранить
                    </Button>
                )}

            </form>

            {isCheckoutPage && items && totalAmount && <CheckoutSummary items={items} totalAmount={totalAmount}/>}
        </div>
    );
};
