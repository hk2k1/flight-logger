import mongoose from "mongoose";

let isConnected = false; // Cache connection status
const MONGODB_URI = process.env.MONGODB_URI;
export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }
  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("=> new database connection");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};
