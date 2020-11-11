import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../schemas/user";
import { Company } from "../../schemas/company";
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

      if (req.body.company) {
        await Company.findByIdAndUpdate(
          { _id: req.body.company },
          { $push: { bondHolders: createdUser } }
        );
      }
      res.status(200).json(createdUser);
      break;
    case "GET":
      const users = await User.find().populate("broker");
      res.status(200).json(users);
      break;
    case "PUT":
      const user = await User.findByIdAndUpdate({ _id: req.body.id }, req.body);
      res.status(200).json(user);
      break;
    case "DELETE":
      const deleteUser = await User.findByIdAndDelete({ _id: req.body.id });
      await Company.findOneAndUpdate(
        { bondHolders: req.body.id },
        { $pull: { bondHolders: req.body.id } }
      );
      res.status(200).json(deleteUser);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
