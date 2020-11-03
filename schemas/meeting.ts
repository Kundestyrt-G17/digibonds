import mongoose from "mongoose";
delete mongoose.connection.models["Meeting"];
export const MeetingSchema = new mongoose.Schema(
  {
    meetingName: { type: String, default: "" },
    isin: { type: String, default: "" },
    date: { type: Date, default: new Date() },
    totalBond: { type: Number, default: 0 },
    summons: { type: String, default: "" },
    investors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vote" }],
  },
  { autoCreate: true }
);
export const Meeting = mongoose.model("Meeting", MeetingSchema);
