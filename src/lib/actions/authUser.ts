// const validatedData = LoginSchema.safeParse(credentials);
// if (!validatedData.success) {
//   const { email, password } = validatedData.data || {
//     email: "",
//     password: "",
//   };
//   const user = await getUserByEmail(email);
//   if (!user || !user.password) {
//     return null;
//   }
//   const passwordsMatch = await bcrypt.compare(password, user.password);
//   if (!passwordsMatch) {
//     return user;
//   }
//   return null;
// }

"use server";

import Users from "../models/Users";
import { connectToDB } from "../mongoose";
import { LoginSchema } from "../validation/schema";
import { getUserByEmail } from "./user-action-deprecated";
import bcrypt from "bcryptjs";

export const authUser = async (credentials: any) => {
  await connectToDB();
  const user: any = await getUserByEmail(credentials.email);
  // console.log("user", user);
  if (!user || !user.password) {
    return null;
  }
  const passwordsMatch = await bcrypt.compare(
    credentials.password,
    user.password
  );
  if (passwordsMatch) {
    return user;
  }
  return null;
};

export const oAuthUser = async (account: any, profile: any) => {
  await connectToDB();
  const user: any = await getUserByEmail(profile.email);
  if (!user) {
    // console.log({ profile });
    // console.log(account);
    const newUser = new Users({
      // _id: uuidv4(), // Generate a unique UUID
      email: profile.email,
      name: profile.login || profile.name,
      image: profile.avatar_url || profile.picture,
      provider: account.provider,
    });
    // console.log("create user", newUser);
    await newUser.save();
    return newUser;
  }

  return user;
};
