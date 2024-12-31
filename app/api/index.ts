import { NextApiRequest, NextApiResponse } from "next";
export async function GET(req:NextApiRequest, res: NextApiResponse) {
   try {
    res.status(200).json({ message: "GET request to the homepage" });
   } catch (error) {
     res.status(500).json({ error: (error as Error).message });
    
   }
}