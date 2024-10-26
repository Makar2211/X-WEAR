import { useForm } from "react-hook-form";
import { SignUpData, SignUpSchema } from "../types/sheams";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export const useSignUp = () => {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpData) => {
    const { email, password } = data;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.message);
        toast.error(responseData.message);
        return;
      }

      toast.success("Мы выслали вам письмо с подтверждением на почту", {
        icon: "📩",
        duration: 4000,
      });
      router.push("/sign-in");
    } catch (error: any) {
      toast.error("Произошла ошибка при регистрации");
      console.error("Ошибка:", error);
    }
  };
  return {
    signUpRegister: register,
    signUpSubmit: handleSubmit(
      onSubmit
    ) as any as React.FormEventHandler<HTMLFormElement>,
    error,
    signUpErrors: errors,
  };
};
