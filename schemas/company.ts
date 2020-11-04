import mongoose from "mongoose";
delete mongoose.connection.models["Company"];

export interface ICompany extends mongoose.Document {
  name: string;
}

export const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
  },
  { autoCreate: true }
);
export const Company = mongoose.model<ICompany>("Company", CompanySchema);
