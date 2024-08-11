import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/lib/validation/schema";
import { getUserByEmail, getUserById } from "./lib/actions/user.action";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { authUser } from "@/lib/actions/authUser";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as "admin" | "user";
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) {
        return token;
      }
      token.role = existingUser.role;
      return token;
    },
  },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials: any) {
        try {
          // console.log("credentials", credentials);
          const user = await authUser(credentials); // Return null if user is not found or password doesn't match
          // console.log("user", user);
          if (!user) {
            throw new Error("user not found");
          }
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
