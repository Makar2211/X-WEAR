import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutData, CheckoutSchema } from "../types/sheams";
import { useForm } from "react-hook-form";
import { useGetUser } from "./use-get-user";
import { useCart } from "./use-cart";
import { useRouter } from "next/navigation";

export const useCheckout = () => {
  const router = useRouter();
  const [checkbox, setCheckbox] = React.useState<boolean>(false);
  const { items, totalAmount } = useCart();
  const { user, userLoading } = useGetUser();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
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

  const handleCheckbox = () => {
    setCheckbox(!checkbox);
  };

  React.useEffect(() => {
    if (user) {
      reset({
        email: user.email || "",
        name: user.name || "",
        last_name: user.last_name || "",
        phone: user.phone || "",
      });
    }
  }, [user, userLoading, reset]);
  const onSubmit = async (data: CheckoutData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`,
        {
          method: "POST",
          body: JSON.stringify({
            ...data,
            checkbox,
            items,
            totalAmount,
          }),
        }
      );
      const resData = await response.json();
      if (!response.ok && resData.url) {
        throw new Error();
      }

      router.push(resData.url);
    } catch (error) {
      console.error("При запросе на оплату товара произошла ошибка", error);
    }
    console.log("Form data:", data);
  };
  return {
    onSubmitCheckout: onSubmit,
    handleSubmitCheckout: handleSubmit,
    registerCheckout: register,
    setValueCheckout: setValue,
    errorsCheckout: errors,
    handleCheckbox,
    checkbox,
    items,
    totalAmount,
  };
};
