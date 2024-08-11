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

import { connectToDB } from "../mongoose";
import { LoginSchema } from "../validation/schema";
import { getUserByEmail } from "./user.action";
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
