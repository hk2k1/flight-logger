"use server";

import { connectToDB } from "../mongoose";
import Users, { IUser } from "../models/Users";
import { UserSchema } from "../validation/schema";
import { auth } from "@/auth";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";

type UserFormData = z.infer<typeof UserSchema>;

export async function getUsers() {
  await connectToDB();
  const user = await auth();

  if (user?.user.role !== "admin") {
    console.log("Unauthorized");
    // throw new Error("Unauthorized");
  }

  const users = await Users.find({});
  const totalCount = await Users.countDocuments({});

  const serializedUsers = users.map((user) => ({
    id: user._id.toString(),
    name: user.name,
    role: user.role,
    image: user.image,
    provider: user.provider,
    email: user.email,
  }));

  return { users: serializedUsers, totalCount };
}

export async function createUser(data: UserFormData) {
  await connectToDB();
  const user = await auth();

  if (user?.user.role !== "admin") {
    console.log("Unauthorized");
    // throw new Error("Unauthorized");
  }

  const validatedData = UserSchema.parse(data);
  const newUser = new Users({
    ...validatedData,
    uid: uuidv4(),
  });
  await newUser.save();
  return true;
}

export async function updateUser(id: string, data: UserFormData) {
  await connectToDB();
  const user = await auth();
  // console.log(user);
  if (user?.user.role !== "admin") {
    console.log("Unauthorized");
    // throw new Error("Unauthorized");
  }

  const updatedUser = await Users.findByIdAndUpdate(id, data, {
    new: true,
    lean: true,
  });
  if (!updatedUser) {
    throw new Error("User not found");
  }
  return updatedUser;
}

export async function deleteUser(id: string) {
  await connectToDB();
  const user = await auth();

  if (user?.user.role !== "admin") {
    console.log("Unauthorized");
    // throw new Error("Unauthorized");
  }

  const deletedUser = await Users.findByIdAndDelete(id, { lean: true });
  console.log("Deleted USER FROM USER ACTION:", deletedUser);
  if (!deletedUser) {
    throw new Error("User not found");
  }
  return { message: "User deleted successfully" };
}
