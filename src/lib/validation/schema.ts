import { z } from "zod";
import { Types } from "mongoose";
// import { v4 as uuidv4 } from "uuid";

export const FlightLogSchema = z.object({
  tailNumber: z.string().min(1, "Tail number is required"),
  flightID: z.string().min(1, "Flight ID is required"),
  takeoff: z.string().min(1, "Takeoff location is required"),
  landing: z.string().min(1, "Landing location is required"),
  duration: z
    .string()
    .min(1, "Duration is required")
    .regex(
      /^(\d+h)?\s*(\d+m)?$/,
      "Invalid duration format. Use format like '2h 30m' or '45m'"
    ),
  // email: z.string().email(),
  // fid: z.string().default(uuidv4()),
});

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["user", "admin"]),
  image: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export type FlightLogType = z.infer<typeof FlightLogSchema>;
// export type UserType = z.infer<typeof UserSchema>;
export type UserFormData = z.infer<typeof UserSchema>;
