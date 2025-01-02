import { NextApiRequest, NextApiResponse } from "next";
 
import User from "../../../models/userModel";
import dbConnect from "@/app/utils/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
      break;

    case "POST":
      try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
      } catch (error) {
        res.status(400).json({ message: "Failed to create user" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
