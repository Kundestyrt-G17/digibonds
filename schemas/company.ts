import mongoose from "mongoose";
delete mongoose.connection.models["Company"];
import { IUser } from "./user";

require("./user");

export interface ICompany extends mongoose.Document {
  name: string;
  bondHolders: IUser[];
}

export const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    bondHolders: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { autoCreate: true }
);
export const Company = mongoose.model<ICompany>("Company", CompanySchema);
