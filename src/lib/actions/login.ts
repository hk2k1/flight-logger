"use server";
import * as z from "zod";
import { LoginSchema } from "../validation/schema";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedData = LoginSchema.safeParse(values);
  if (!validatedData.success) {
    return { error: "Invalid Fields!" };
  }
  const { email, password } = validatedData.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (e) {
    // if error is instance of Auth Error open switch case
    if (e instanceof AuthError) {
      switch (e.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    //must throw error if not bugged out
    console.log(e);
    throw e;
  }
};
