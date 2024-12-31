// import { auth } from "google-auth-library";
import { authorize } from "../(auth)";
import { listEvents } from "../(apiFunction)";
// import { NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    // Get the authorized client
    const auth = await authorize();
    // Fetch events
    const eventsResponse = await listEvents(auth);
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
 
