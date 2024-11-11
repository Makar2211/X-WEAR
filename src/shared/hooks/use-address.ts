import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {useCart} from "@/shared/hooks/use-cart";
import {useGetUser} from "@/shared/hooks/use-get-user";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CheckoutData, CheckoutSchema} from "@/shared/types/sheams";
import toast from "react-hot-toast";

export const useAddress = () => {
    const [message, setMessage] = useState('')

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        resetField,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(CheckoutSchema),
        defaultValues: {
            email: "",
            name: "",
            name_of_company: "",
            last_name: "",
            country: "",
            phone: "",
            street: "",
            apartment: "",
            city: "",
            neighborhoods: "",
            index: "",
        },
    });
    const onSubmit = async (data: CheckoutData) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/addresses/create`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        ...data,
                    }),
                }
            );
            const resData = await response.json();
            if (!response.ok) {
                throw new Error();
                toast.error(resData)

            }

            toast.success(resData)
            reset()
        } catch (error) {
            console.error("При запросе на оплату товара произошла ошибка", error);
        }
        console.log("Form data:", data);
    };
    return {
        onSubmitAddress: onSubmit,
        handleSubmitAddress: handleSubmit,
        registerAddress: register,
        setValueAddress: setValue,
        errorsAddress: errors,

    };
};