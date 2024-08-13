"use server";

import { revalidatePath } from "next/cache";
import Users from "../models/Users";
import { connectToDB } from "../mongoose";
import { UserSchema } from "../validation/schema";

export async function updateUser(
  userId: string,
  username: string,
  name: string,
  path: string
): Promise<void> {
  try {
    await connectToDB();

    await Users.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name: name },
      { upsert: true }
    );
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    await connectToDB();
    return await Users.findOne({ email });
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    await connectToDB();
    return await Users.findOne({ id });
  } catch {
    return null;
  }
};
