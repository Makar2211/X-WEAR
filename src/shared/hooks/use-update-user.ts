import { useForm } from "react-hook-form";
import { useGetUser } from "./use-get-user";
import React from "react";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserSchema } from "../types/sheams";

interface IUpdateUser {
  email: string;
  name: string;
  last_name: string;
  phone: string;
}

export const useUpdateUser = () => {
  const { user, userLoading } = useGetUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      email: "",
      name: "",
      last_name: "",
      phone: "",
    },
  });

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

  // Обработчик отправки формы
  const onSubmit = async (data: IUpdateUser) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        toast.error("Невозможно изменить почту");
        throw new Error("Failed to update user data");
      }
      toast.success("Ваши данные успешно обновлены");
      return "данные обновлены";
    } catch (error) {
      console.error("При обновлении данных произошла ошибка", error);
    }
  };

  return {
    updateRegister: register,
    updateSubmit: handleSubmit(
      onSubmit
    ) as any as React.FormEventHandler<HTMLFormElement>,
    updateErrors: errors,
    userLoading,
  };
};
