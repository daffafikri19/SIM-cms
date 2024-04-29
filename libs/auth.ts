import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
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
          const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/auth/login", {
            email: credentials?.email,
            password: credentials?.password
          }, {
            headers: {
              "Content-Type": "application/json"
            }
          });
          console.log("login response", response.data)
          const user = response.data.data;
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role.name,
            profile_picture: user.profile_picture,
            shift: user.shift,
          }
        } catch (error: any) {
          console.log("auth error", error)
          throw new Error(error.response.data.message)
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
