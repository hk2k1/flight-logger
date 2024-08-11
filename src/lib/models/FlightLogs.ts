import mongoose, { Schema, model, models } from "mongoose";

export interface IFlightLog {
  tailNumber: string;
  flightID: string;
  takeoff: Date;
  landing: Date;
  duration: number;
}

const FlightLogSchema = new Schema<IFlightLog>(
  {
    tailNumber: { type: String, required: true },
    flightID: { type: String, required: true },
    takeoff: { type: Date, required: true },
    landing: { type: Date, required: true },
    duration: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const FlightLogs =
  models.FlightLog || model<IFlightLog>("FlightLogs", FlightLogSchema);

export default FlightLogs;
