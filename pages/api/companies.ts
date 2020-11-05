import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { Company } from "../../schemas/company";
import { url } from "../../utils/connection";
import { User } from '@/schemas/user';

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
      const createdCompany = new Company(req.body);
      await createdCompany.save();
      res.status(200).json(createdCompany);
      break;
    case "GET":
      const companies = await Company.find().populate({path: "bondHolders", populate: {path: "broker"} });
      res.status(200).json(companies);
      break;
    case "PUT":
      const company = await Company.findByIdAndUpdate({_id: req.body.id}, req.body);
      res.status(200).json(company);
      break;
    case "DELETE":
      const deleteCompany = await Company.findByIdAndDelete({_id: req.body.id});
      res.status(200).json(deleteCompany);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
