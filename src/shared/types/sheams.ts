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
  name: z.string().min(2, { message: "Имя должно быть больше одного символа" }),
  last_name: z
    .string()
    .min(2, { message: "Фамилия должно быть больше одного символа" }),
  phone: z.string(),
});

export type UpdateUserData = z.infer<typeof UpdateUserSchema>;
