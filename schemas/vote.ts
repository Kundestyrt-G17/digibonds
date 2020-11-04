import mongoose from "mongoose";
delete mongoose.connection.models["Vote"];
import { ICompany } from "./company";

export interface IVote extends mongoose.Document {
  company: ICompany;
  bondsOwned: number;
  accountNumber: number;
  phoneNumber: number;
  proofOfHolding: string;
  favor: string;
}

export const VoteSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    bondsOwned: { type: Number, default: 0 },
    accountNumber: { type: Number, default: 0 },
    phoneNumber: { type: Number, default: 0 },
    proofOfHolding: { type: String, default: "" },
    favor: { type: Boolean, default: false },
  },
  { autoCreate: true }
);

export const Vote = mongoose.model<IVote>("Vote", VoteSchema);
