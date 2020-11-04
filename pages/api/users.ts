import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../schemas/user";
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
      const createdUser = new User(req.body);
      await createdUser.save();
      res.status(200).json(createdUser);
      break;
    case "GET":
      const users = await User.find().populate("broker");
      res.status(200).json(users);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
