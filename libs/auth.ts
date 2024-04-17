import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan Password tidak boleh kosong");
        }
        try {
          const existingUser = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!existingUser) {
            throw new Error("Akun tidak ditemukan");
          }

          const matchPassword = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );

          if (!matchPassword) {
            throw new Error("Password salah");
          }

          const user = await prisma.user.findUnique({
            where: {
              email: existingUser.email,
            },
            select: {
              id: true,
              name: true,
              email: true,
              profile_picture: true,
              role: true,
              shift: true
            }
          });
          return user;
        } catch (error: any) {
          console.log(error)
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  debug: false,
  secret: process.env.NEXTAUTH_SECRET || "",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          profile_picture: user.profile_picture,
          role: user.role,
          shift: user.shift,
        };
      }
      return token;
    },
    async session({ session, token }) {
      const context = {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          profile_picture: token.profile_picture,
          role: token.role,
          shift: token.shift,
        },
      };
      return context;
    },
  },
};
