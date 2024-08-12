import { z } from "zod";

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
});

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  name: z.string().min(1, "Name is required"),
  image: z.string().optional(),
  bio: z.string().optional(),
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
export type UserType = z.infer<typeof UserSchema>;
