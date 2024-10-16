"use client";
import React from "react";
import { Button } from "@/src/shared/components/ui/button";
import { useSignIn } from "@/src/shared/hooks";
import {
  FormContainer,
  CustomInput,
  FormSwitcher,
  SignInProvider,
} from "@/src/shared/components/elements";

export default function SignIn() {
  const { signInErrors, signInSubmit, signInRegister, error } = useSignIn();
  return (
    <FormContainer onSubmit={signInSubmit} title="вход">
      <CustomInput
        label="Email адрес"
        errorMessage={signInErrors.email?.message}
        placeholder="yavasyaivanov@gmail.com"
        register={signInRegister("email")}
        type="email"
      />
      <CustomInput
        label="Пароль"
        errorMessage={signInErrors.password?.message}
        placeholder="*********************"
        register={signInRegister("password")}
        type="password"
      />
      {error && <p className="mt-2 text-red-600 font-bold  ml-1">{error}</p>}

      <div className="flex gap-2 justify-center items-center mt-4 mb-4">
        <SignInProvider provider="google" img="/img/google-icon.svg" />
        <SignInProvider provider="github" img="/img/github-icon.svg" />
      </div>

      <FormSwitcher
        text="Ещё не аккаунта?"
        route="/sign-up"
        routeTitle="Зарегистрироваться"
      />

      <Button
        className="w-[300px] h-[66px] rounded block mx-auto"
        variant="blackandwhite"
        type="submit"
      >
        Войти
      </Button>
    </FormContainer>
  );
}
