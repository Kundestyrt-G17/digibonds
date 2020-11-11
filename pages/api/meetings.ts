import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { IMeeting, Meeting } from "../../schemas/meeting";
import { Vote } from "../../schemas/vote";
import { url } from "../../utils/connection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  switch (method) {
    case "POST":
      const createdVotes = req.body.votes.map((vote) => {
        const createdVote = new Vote(vote).save();
        return createdVote;
      });

      const resolvedVotes = await Promise.all(createdVotes);

      const createdMeeting = new Meeting({ ...req.body, votes: resolvedVotes });
      await createdMeeting.save();
      res.status(200).json(createdMeeting);
      break;
    case "GET":
      const meetings: IMeeting[] = await Meeting.find({}).populate("votes");
      meetings.sort((a, b) => {
        return a.date.valueOf() - b.date.valueOf();
      });
      res.status(200).json(meetings);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
