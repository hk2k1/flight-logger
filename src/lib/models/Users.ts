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
      required: true,
    },
    image: String,
    bio: String,
    flightLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "FlightLogs" }],
    path: String,
    isAdmin: { type: Boolean, default: false },
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
