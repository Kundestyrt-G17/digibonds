import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { Meeting } from "schemas/meeting";
import { url } from "utils/connection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  switch (method) {
    case "GET":
      const foundMeeting = await Meeting.findById(id).populate({
        path: "votes",
        populate: { path: "company" },
      });
      console.log(foundMeeting);
      res.status(200).json(foundMeeting);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
