import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { Meeting } from "../../schemas/meeting";
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
  console.log(req.body);
  switch (method) {
    case "POST":
      const createdMeeting = new Meeting(req.body);
      await createdMeeting.save();
      res.status(200).json(createdMeeting);
      break;
    case "GET":
      const meetings = await Meeting.find();
      res.status(200).json(meetings);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
