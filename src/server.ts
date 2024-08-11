import dotenv from "dotenv";
import next from "next";
import nextBuild from "next/dist/build";
import path from "path";
import express from "express";
import { connect } from "mongoose";

// Load environment variables from .env file
// Keeps sensitive information out of the codebase
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const start = async (): Promise<void> => {
  // Initialize MongoDB Connection
  await connectDB();

  // Conditional logic for Next.js build process
  // If NEXT_BUILD is set, start Express for the api -> then build next
  // If not set, build next and start Express as default
  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      console.log(`> Ready on http://localhost:${PORT}`);
      // @ts-expect-error
      await nextBuild(path.join(__dirname, "../"));
      process.exit();
    });
    return;
  }

  //Build production next if env set
  const nextApp = next({ dev: process.env.NODE_ENV !== "production" });

  // Pass express handlers to NextJS
  // Express to handle API routes while Next.js handles page routes
  const nextHandler = nextApp.getRequestHandler();
  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    app.listen(PORT, () => {
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  });
};

start().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
