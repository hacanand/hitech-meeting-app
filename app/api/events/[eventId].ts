 
import { NextApiRequest, NextApiResponse } from "next";
import { authorize } from "../(auth)";
import { getAcceptedAttendees } from "../(apiFunction)";
import { NextResponse } from "next/server";

export default async function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  try {
    const { eventId } = req.query;
// console.log(eventId)
    if (typeof eventId !== "string") {
      return res.status(400).json({ message: "Invalid or missing eventId" });
    }

    // Authorize the Google Calendar API client
    const auth = await authorize();

    // Fetch attendees
    const response = await getAcceptedAttendees(auth, eventId);

    if (!response.success) {
      return NextResponse.json({
        message: response.message,
        error: response.error,
      });
    }

    return NextResponse.json({
      message: response.message,
      attendees: response.attendees,
    });
  } catch (err: any) {
    console.error("Error in API handler:", err);
    return NextResponse.json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
}
