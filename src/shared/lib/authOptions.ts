import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hashSync } from "bcrypt";
import { randomBytes } from "crypto";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "../../../prisma/prisma-client";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const values = {
          email: credentials.email,
        };

        const findedUser = await prisma.user.findFirst({
          where: values,
        });

        if (!findedUser) {
          throw new Error("Пользователь не найден");
        }
        if (!findedUser.emailVerified) {
          throw new Error("Почта не подтверждена");
        }

        const isPasswordValid = await compare(
          credentials.password,
          findedUser.password
        );

        if (!isPasswordValid) {
          throw new Error("Неудалось войти");
        }
        return {
          id: String(findedUser.id),
          email: findedUser.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const findUser = await prisma.user.findFirst({
          where: {
            email: user.email as string,
          },
        });

        if (findUser) {
          return true;
        }

        const name = user?.name?.split(" ")[0] || "Пользователь";
        const last_name = user?.name?.split(" ")[1] || "Пользователь";
        const randomPassword = randomBytes(16).toString("hex");

        const userIsCreated = await prisma.user.create({
          data: {
            email: user.email as string,
            name,
            last_name,
            emailVerified: true,
            password: hashSync(randomPassword, 10),
          },
        });
      }

      return true;
    },
    async jwt({ token, account, profile, user }) {
      if (!token.email) {
        return token;
      }

      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser?.email;
      }
      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.email = token.email as string;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};
