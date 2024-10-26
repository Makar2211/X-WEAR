"use client";
import React from "react";
import { Button } from "@/shared/components/ui/button";
import { useSignUp } from "@/shared/hooks";
import {
  CustomInput,
  FormContainer,
  FormSwitcher,
} from "@/shared/components/elements";

export default function SignUp() {
  const { signUpRegister, signUpSubmit, error, signUpErrors } = useSignUp();
  return (
    <FormContainer onSubmit={signUpSubmit} title="регистрация">
      <CustomInput
        label="Email адрес"
        errorMessage={signUpErrors.email?.message}
        placeholder="yavasyaivanov@gmail.com"
        register={signUpRegister("email")}
        type="email"
      />

      <CustomInput
        label="Пароль"
        errorMessage={signUpErrors.password?.message}
        placeholder="*********************"
        register={signUpRegister("password")}
        type="password"
      />

      <CustomInput
        label="Повторите пароль"
        errorMessage={signUpErrors.confirmPassword?.message}
        placeholder="*********************"
        register={signUpRegister("confirmPassword")}
        type="password"
      />
      {error && <p className="mt-2 text-red-600 font-bold  ml-1">{error}</p>}

      <FormSwitcher
        text="Уже есть аккаунт?"
        route="/sign-in"
        routeTitle="Вход"
      />
      <Button
        className="w-[300px] h-[66px] rounded block mx-auto"
        variant="blackandwhite"
        type="submit"
      >
        Зарегистрироваться
      </Button>
    </FormContainer>
  );
}
