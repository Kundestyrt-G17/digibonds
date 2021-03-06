import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { Vote } from "schemas/vote";
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
      const foundVote = await Vote.findById(id).populate({
        path: "company",
        populate: { path: "bondHolders", populate: { path: "broker" } },
      });
      res.status(200).json(foundVote);
      break;
    case "PUT":
      await Vote.findByIdAndUpdate(
        { _id: id },
        {
          favor: req.body.favor,
          proofOfHolding: req.body.proofOfHolding,
          pohStatus: req.body.pohStatus,
          bondsOwned: req.body.bondsOwned,
        }
      );
      res.status(200).end();
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
