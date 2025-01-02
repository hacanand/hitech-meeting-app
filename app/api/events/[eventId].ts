 
import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "@/app/utils/dbConnect";
import Event from "../../../models/eventModel";

// export default async function GET(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
  
//   try {
//     const { eventId } = req.query;
// // console.log(eventId)
//     if (typeof eventId !== "string") {
//       return res.status(400).json({ message: "Invalid or missing eventId" });
//     }

//     // Authorize the Google Calendar API client
//     const auth = await authorize();

//     // Fetch attendees
//     const response = await getAcceptedAttendees(auth, eventId);

//     if (!response.success) {
//       return NextResponse.json({
//         message: response.message,
//         error: response.error,
//       });
//     }

//     return NextResponse.json({
//       message: response.message,
//       attendees: response.attendees,
//     });
//   } catch (err: any) {
//     console.error("Error in API handler:", err);
//     return NextResponse.json({
//       message: "Internal Server Error",
//       error: err.message,
//     });
//   }
// }


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { eventId } = req.query;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const event = await Event.findById(eventId);
        if (!event) {
          return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(event);
      } catch (error) {
        res.status(500).json({ error: "Failed to retrieve event" });
      }
      break;

    case "PUT":
      try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedEvent) {
          return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(updatedEvent);
      } catch (error: any) {
        res
          .status(400)
          .json({ error: error.message || "Failed to update event" });
      }
      break;

    case "DELETE":
      try {
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
          return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete event" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
