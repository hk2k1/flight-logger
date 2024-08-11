import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, required: true },
    image: String,
    bio: String,
    flightLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "FlightLog" }],
    path: String,
  },
  { timestamps: true }
);

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);
export default Users;
