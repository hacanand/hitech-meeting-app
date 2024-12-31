import { NextApiRequest, NextApiResponse } from "next";
import { getAcceptedAttendees } from "../../(apiFunction)";
import { authorize } from "../../(auth)";
import { NextResponse } from "next/server";

export async function GET(req:NextApiRequest, res: NextApiResponse) {
  try {
      // Get the authorized client
      const {eventId}  = req.query;
    const auth = await authorize();
    // Fetch events
    if (typeof eventId !== 'string') {
      throw new Error('Invalid eventId');
    }
    const eventsResponse = getAcceptedAttendees(auth, eventId);
    return eventsResponse; // Ensure the response from listEvents is returned
  } catch (err) {
    console.error("Error in route handler:", err);
    return NextResponse.json({
      message: "Failed to retrieve events",
      error: (err as Error).message,
      status: 500,
    });
  }
}