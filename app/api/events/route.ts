// // import { auth } from "google-auth-library";
// import { authorize } from "../(auth)";
// import { listEvents } from "../(apiFunction)";
// // import { NextApiResponse } from "next";
// import { NextResponse } from "next/server";


// export async function GET() {
//   try {
//     // Get the authorized client
//     const auth = await authorize();
//     // Fetch events
//     const eventsResponse = await listEvents(auth);
//     return eventsResponse; // Ensure the response from listEvents is returned
//   } catch (err) {
//     console.error("Error in route handler:", err);
//     return NextResponse.json({
//       message: "Failed to retrieve events",
//       error: (err as Error).message,
//       status: 500,
//     });
//   }
// }
 
import { NextApiRequest, NextApiResponse } from "next";
  
import Event from "../../../models/eventModel";
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
        const events = await Event.find({});
        res.status(200).json(events);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch events" });
      }
      break;

    case "POST":
      try {
        const newEvent = await Event.create(req.body);
        res.status(201).json(newEvent);
      } catch (error: any) {
        res
          .status(400)
          .json({ error: error.message || "Failed to create event" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

