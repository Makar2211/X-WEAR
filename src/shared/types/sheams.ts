import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "Минимум 8 символов" })
  .max(20, { message: "Максимум 20 символов" })
  .refine((password: string) => /[A-Z]/.test(password), {
    message: "Пароль должен содержать хотя бы одну заглавную букву",
  });

export const SignUpSchema = z
  .object({
    email: z.string().email({ message: "Неверный формат почты" }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Пароли не совпадают",
        path: ["confirmPassword"],
      });
    }
  });

export type SignUpData = z.infer<typeof SignUpSchema>;

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Неверный формат почты",
  }),
  password: z.string().min(8, { message: "Минимум 8 символов" }),
});

export type SignInData = z.infer<typeof SignInSchema>;

export const UpdateUserSchema = z.object({
  email: z.string().email({
    message: "Неверный формат почты",
  }),
  name: z.string().min(2, { message: "Обязательное поле" }),
  last_name: z.string().min(2, { message: "Обязательное поле" }),
  phone: z.string().min(10, {message: "Обязательное поле" }),
});

export type UpdateUserData = z.infer<typeof UpdateUserSchema>;

export const CheckoutSchema = UpdateUserSchema.extend({
  name_of_company: z.string(),
  country: z.string(),
  street: z.string().min(1, { message: "Обязательное поле" }),
  apartment: z.string().min(1, { message: "Обязательное поле" }),
  city: z.string().min(2, { message: "Обязательное поле" }),
  neighborhoods: z.string().min(1, { message: "Обязательное поле" }),
  index: z.string().min(1, { message: "Обязательное поле" }),
});
export type CheckoutData = z.infer<typeof CheckoutSchema>;
