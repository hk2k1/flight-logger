"use server";
import * as z from "zod";
import { LoginSchema } from "../validation/schema";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedData = LoginSchema.safeParse(values);
  if (!validatedData.success) {
    return { error: "Invalid Fields!" };
  }
  return { success: "Great Success!" };
};
