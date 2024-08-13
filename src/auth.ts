import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/lib/validation/schema";
import { getUserByEmail, getUserById } from "./lib/actions/user-auth-action";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { authUser, oAuthUser } from "@/lib/actions/authUser";

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
    async signIn({ account, profile }) {
      if (account?.provider != "credentials") {
        const user = await oAuthUser(account, profile);
      }
      return true;
    },
  },
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials: any) {
        try {
          console.log("credentials", credentials);
          const user = await authUser(credentials); // Return null if user is not found or password doesn't match
          console.log("user", user);
          if (!user) {
            throw new Error("user not found");
          }
          return user;
        } catch (error) {
          console.log("error", error);
          return null;
        }
      },
    }),
  ],
});
