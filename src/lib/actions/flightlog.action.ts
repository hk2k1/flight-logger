"use server";

import { connectToDB } from "../mongoose";
import FlightLog, { IFlightLog } from "../models/FlightLogs";
import { FlightLogSchema } from "../validation/schema";

export async function getFlightLogs() {
  await connectToDB();
  const flightLogs = await FlightLog.find({});
  return flightLogs;
}

export async function createFlightLog(data: IFlightLog) {
  await connectToDB();
  const validatedData = FlightLogSchema.parse(data);
  const newFlightLog = new FlightLog(validatedData);
  await newFlightLog.save();
  return newFlightLog;
}

export async function updateFlightLog(id: string, data: Partial<IFlightLog>) {
  await connectToDB();
  const validatedData = FlightLogSchema.parse(data);
  const updatedFlightLog = await FlightLog.findByIdAndUpdate(
    id,
    validatedData,
    {
      new: true,
    }
  );
  return updatedFlightLog;
}

export async function deleteFlightLog(id: string) {
  await connectToDB();
  await FlightLog.findByIdAndDelete(id);
  return { message: "Flight log deleted successfully" };
}
