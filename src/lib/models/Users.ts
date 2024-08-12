import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, lowercase: true },
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
    bio: String,
    flightLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "FlightLogs" }],
    path: String,
    role: { type: String, default: "user" },
    provider: { type: String, default: "email" },
  },
  { timestamps: true }
);

// const Users = mongoose?.models.Users || mongoose?.model("Users", userSchema);
let Users;
try {
  Users = mongoose.model("Users");
} catch {
  Users = mongoose.model("Users", userSchema);
}
export default Users;
