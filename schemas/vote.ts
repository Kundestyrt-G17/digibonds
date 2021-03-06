import mongoose from "mongoose";
delete mongoose.connection.models["Vote"];
import { ICompany } from "./company";
import { PoHStatusType, VoteFavorType } from "@/utils/types";

require("./company");

export interface IVote extends mongoose.Document {
  company: ICompany;
  bondsOwned: number;
  proofOfHolding: string;
  pohStatus: PoHStatusType;
  favor: VoteFavorType;
}

export const VoteSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    bondsOwned: { type: Number, default: 0 },
    proofOfHolding: { type: String, default: "" },
    pohStatus: { type: String, default: "-" },
    favor: { type: String, default: "Not voted" },
  },
  { autoCreate: true }
);

export const Vote = mongoose.model<IVote>("Vote", VoteSchema);
