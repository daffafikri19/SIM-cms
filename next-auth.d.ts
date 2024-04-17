import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    name?: string;
    email?: string;
    profile_picture?: string | null;
    role?: any;
    shift?: string;
  }

  interface Session {
    user: User & {
      id?: string;
      name?: string;
      email?: string;
      profile_picture?: string | null;
      role?: any;
      shift?: string;
    };
    token: {
      id?: string;
      name?: string;
      email?: string;
      profile_picture?: string | null;
      role?: any;
      shift?: string;
    };
  }
}
