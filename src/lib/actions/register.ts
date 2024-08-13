"use server";
import * as z from "zod";
import { RegisterSchema } from "../validation/schema";
import bcrypt from "bcrypt";
import { connectToDB } from "../mongoose";
import Users from "../models/Users";
import { getUserByEmail } from "./user-action-deprecated";
import { v4 as uuidv4 } from "uuid";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedData = RegisterSchema.safeParse(values);
  if (!validatedData.success) {
    return { error: "Invalid Fields!" };
  }

  const { email, password, name } = validatedData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  await connectToDB();
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    // Handle case where the email is already registered
    return { error: "Email already exists" };
  }

  // If the email doesn't exist, create a new user
  const newUser = new Users({
    // _id: uuidv4(), // Generate a unique UUID
    email,
    password: hashedPassword,
    name,
  });
  await newUser.save();

  // Email Verification Code can go HERE!

  return { success: "Great Success!" };
};
