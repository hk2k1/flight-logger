"use server";
import * as z from "zod";
import { RegisterSchema } from "../validation/schema";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedData = RegisterSchema.safeParse(values);
  if (!validatedData.success) {
    return { error: "Invalid Fields!" };
  }
  return { success: "Great Success!" };
};
