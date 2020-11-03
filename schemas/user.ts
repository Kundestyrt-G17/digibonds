import mongoose from "mongoose";
delete mongoose.connection.models["User"];
export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, default: "" },
    name: { type: String, default: "" },
    phone: { type: Number, default: "" },
    password: { type: String, default: "" },
    broker: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { autoCreate: true }
);
export const User = mongoose.model("User", UserSchema);
