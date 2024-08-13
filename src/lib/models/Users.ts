import mongoose from "mongoose";

export interface IUser {
  // _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  image?: string;
  provider?: "email" | "google" | "github";
}

const userSchema = new mongoose.Schema(
  {
    // _id: { type: String },
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    image: String,
    flightLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "FlightLogs" }],
    role: { type: String, enum: ["user", "admin"], default: "user" },
    provider: { type: String, default: "email" },
  },
  { timestamps: true }
);

// const Users = mongoose?.models.Users || mongoose?.model("Users", userSchema);
let Users: mongoose.Model<IUser>;
try {
  Users = mongoose.model<IUser>("Users");
} catch {
  Users = mongoose.model<IUser>("Users", userSchema);
}
export default Users;
