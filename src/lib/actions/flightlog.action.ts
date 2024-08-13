"use server";

import { connectToDB } from "../mongoose";
import FlightLog, { IFlightLog } from "../models/FlightLogs";
import { FlightLogSchema } from "../validation/schema";
import { useCurrentUser } from "../hooks/use-current-role";
import getServerSession from "next-auth";
import { auth } from "@/auth";
import * as z from "zod";
import { Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

type FlightLogFormData = z.infer<typeof FlightLogSchema>;

export async function getFlightLogs() {
  await connectToDB();
  // const user = await useCurrentUser();
  const user = await auth();
  console.log("USER!!", user);
  let flightLogs;
  let totalCount;

  if (user?.user.role === "admin") {
    flightLogs = await FlightLog.find({});
    totalCount = await FlightLog.countDocuments({});
  } else {
    flightLogs = await FlightLog.find({ email: user?.user.email });
    totalCount = flightLogs.length; // Count of user's logs
  }
  // const flightLogs = await FlightLog.find({});
  // const totalCount = await FlightLog.countDocuments({});
  // Serialize the flightLogs
  const serializedLogs = flightLogs.map((log) => ({
    tailNumber: log.tailNumber,
    flightID: log.flightID,
    takeoff: log.takeoff,
    landing: log.landing,
    duration: log.duration,
    email: log.email,
    fid: log.fid,
  }));

  return { flightLogs: serializedLogs, totalCount };
}

export async function createFlightLog(data: FlightLogFormData) {
  await connectToDB();
  const user = await auth();
  const ufid = uuidv4();
  if (!user) {
    throw new Error("You must be logged in to create a flight log");
  }

  const validatedData = FlightLogSchema.parse(data);
  const newFlightLog = new FlightLog({
    ...validatedData,
    email: user.user.email,
    fid: ufid,
  });
  await newFlightLog.save();
  return true;
}

//NOTE lean:true
// FIXED THE PROBLEM OF objectId error
// TODO: fid should be replaced with _id
export async function updateFlightLog(fid: string, data: FlightLogFormData) {
  await connectToDB();
  const updatedFlightLog = await FlightLog.findOneAndUpdate({ fid }, data, {
    new: true,
    lean: true,
  });
  if (!updatedFlightLog) {
    throw new Error("Flight log not found");
  }
  return updatedFlightLog;
}

export async function deleteFlightLog(fid: string) {
  await connectToDB();

  const deletedFlightLog = await FlightLog.findOneAndDelete(
    { fid },
    {
      lean: true,
    }
  );
  if (!deletedFlightLog) {
    console.log("ID", fid);
    throw new Error("Flight log not found");
  }
  return { message: "Flight log deleted successfully" };
}
