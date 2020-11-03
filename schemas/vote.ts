import mongoose from "mongoose";
delete mongoose.connection.models["Vote"];

export interface IVote extends mongoose.Document {
  company: string;
  bondsOwned: number;
  accountNumber: number;
  phoneNumber: number;
  proofOfHolding: string;
  favor: string;
}

export const VoteSchema = new mongoose.Schema(
  {
    company: { type: String, default: "" },
    bondsOwned: { type: Number, default: 0 },
    accountNumber: { type: Number, default: 0 },
    phoneNumber: { type: Number, default: 0 },
    proofOfHolding: { type: String, default: "" },
    favor: { type: Boolean, default: false },
    investor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { autoCreate: true }
);

export const Vote = mongoose.model<IVote>("Vote", VoteSchema);
