import mongoose from "mongoose";
delete mongoose.connection.models["User"];
export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, default: "" },
    name: { type: String, default: "" },
    password: { type: String, default: "" },
    broker: { type: Boolean, default: false },
  },
  { autoCreate: true }
);
export const User = mongoose.model("User", UserSchema);
