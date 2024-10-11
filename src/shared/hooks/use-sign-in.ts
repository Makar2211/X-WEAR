import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SignInData, SignInSchema } from "../types/sheams";
import { signIn, SignInResponse } from "next-auth/react";
import toast from "react-hot-toast";
import React from "react";

export const useSignIn = () => {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInData) => {
    const { email, password } = data;

    try {
      const response: SignInResponse | undefined = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!response?.ok) {
        throw new Error(response?.error || "Ошибка входа");
      }

      toast.success("Вы успешно вошли в аккаунт");
      router.push("/");
    } catch (error: any) {
      console.error("Login Failed:", error);
      setError(error.message);
      toast.error(error.message);
    }
  };

  return {
    error,
    signInSubmit: handleSubmit(
      onSubmit
    ) as any as React.FormEventHandler<HTMLFormElement>,
    signInRegister: register,
    signInErrors: errors,
  };
};
