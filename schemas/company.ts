import mongoose from "mongoose";
delete mongoose.connection.models["Company"];
export const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    bondholders: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { autoCreate: true }
);
export const Company = mongoose.model("Company", CompanySchema);
