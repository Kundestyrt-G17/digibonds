import mongoose from "mongoose";
delete mongoose.connection.models["Vote"];
export const VoteSchema = new mongoose.Schema(
  {
    company: { type: String, default: "" },
    custodian: { type: String, default: "" },
    bondsOwned: { type: Number, default: 0 },
    accountNumber: { type: Number, default: 0 },
    phoneNumber: { type: Number, default: 0 },
    favor: { type: Boolean, default: false },
    investor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { autoCreate: true }
);
export const Vote = mongoose.model("Vote", VoteSchema);
