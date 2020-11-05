import mongoose from "mongoose";
delete mongoose.connection.models["User"];
import { ICompany } from "./company";

export interface IUser extends mongoose.Document {
  email: string;
  name: string;
  phone: number;
  password: string;
  company: ICompany | string;
  isBroker: boolean;
  broker: IUser;
}

export const UserSchema = new mongoose.Schema(
  {
    email: { type: String, default: "" },
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    password: { type: String, default: "" },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    isBroker: { type: Boolean, default: false },
    broker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { autoCreate: true }
);
export const User = mongoose.model<IUser>("User", UserSchema);
