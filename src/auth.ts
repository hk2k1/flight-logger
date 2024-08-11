import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/lib/validation/schema";
import { getUserByEmail } from "./lib/actions/user.action";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { authUser } from "@/lib/actions/authUser";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
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
