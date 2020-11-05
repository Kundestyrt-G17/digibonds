import mongoose from "mongoose";
delete mongoose.connection.models["Meeting"];
import { IVote } from "./vote";

require("./vote");

export interface IMeeting extends mongoose.Document {
  meetingName: string;
  isin: string;
  date: Date;
  summons: string;
  totalBonds: number;
  votes: IVote[];
}

export const MeetingSchema = new mongoose.Schema(
  {
    meetingName: { type: String, default: "" },
    isin: { type: String, default: "" },
    date: { type: Date, default: new Date() },
    summons: { type: String, default: "" },
    totalBonds: { type: Number, default: 0 },
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vote" }],
  },
  { autoCreate: true }
);
export const Meeting = mongoose.model<IMeeting>("Meeting", MeetingSchema);
