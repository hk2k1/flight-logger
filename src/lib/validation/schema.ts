import { z } from "zod";

export const FlightLogSchema = z.object({
  tailNumber: z.string().min(1, "Tail number is required"),
  flightID: z.string().min(1, "Flight ID is required"),
  takeoff: z.date(),
  landing: z.date(),
  duration: z.number().min(0, "Duration must be a positive number"),
});

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  name: z.string().min(1, "Name is required"),
  image: z.string().optional(),
  bio: z.string().optional(),
});

export type FlightLogType = z.infer<typeof FlightLogSchema>;
export type UserType = z.infer<typeof UserSchema>;
