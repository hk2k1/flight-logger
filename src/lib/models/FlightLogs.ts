import mongoose, { Schema, model, models } from "mongoose";

export interface IFlightLog {
  tailNumber: string;
  flightID: string;
  takeoff: string;
  landing: string;
  duration: string;
}

const FlightLogSchema = new Schema<IFlightLog>(
  {
    tailNumber: { type: String, required: true },
    flightID: { type: String, required: true },
    takeoff: { type: String, required: true },
    landing: { type: String, required: true },
    duration: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const FlightLogs =
  models.FlightLogs || model<IFlightLog>("FlightLogs", FlightLogSchema);

export default FlightLogs as mongoose.Model<IFlightLog>;
