import { google, Auth, calendar_v3 } from "googleapis";
import type { NextApiResponse } from "next";
import { NextResponse } from "next/server";

// /**
//  * List events from Google Calendar.
//  * @param auth - Authenticated OAuth2 client.
//  * @param res - Next.js API response object.
//  */
 

export const listEvents = async (auth: Auth.OAuth2Client) => {
  const calendar = google.calendar({ version: "v3", auth });

  try {
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response?.data?.items || [];
    if (events.length) {
      const eventDetails = events.map((event) => ({
        id: event.id,
        summary: event.summary,
        start: event.start?.dateTime || event.start?.date,
        end: event.end?.dateTime || event.end?.date,
      }));
      return NextResponse.json({
        message: "Events retrieved successfully",
        events: eventDetails,
        status: 200,
      });
    } else {
      return NextResponse.json({
        message: "No upcoming events found.",
        status: 200,
      });
    }
  } catch (err) {
    console.error("The API returned an error:", err);
    return NextResponse.json({
      message: "Error retrieving events",
      error: (err as any).message,
      status: 500,
    });
  }
};

// /**
//  * Get attendees who accepted the event invitation.
//  * @param auth - Authenticated OAuth2 client.
//  * @param eventId - ID of the event.
//  * @param res - Next.js API response object.
//  */


 

// export async function getAcceptedAttendees(
//   auth: any, // Replace `any` with the appropriate Auth.OAuth2Client type if available
//   eventId: string
// ) {
//   const calendar = google.calendar({ version: "v3", auth });

//   try {
//     // Use Promises for handling API requests
//     const event = await calendar.events.get({ eventId });

//     // Extract attendees from the event data
//     const attendees = event?.data?.attendees || [];

//     // Return the attendee list along with a success message
//     return {
//       message: "Attendees retrieved successfully",
//       attendees,
//       status: 200,
//     };
//   } catch (err: any) {
//     if (err.response?.status === 404) {
//       console.error("Event not found. Verify the event ID or calendar access.");
//       return {
//         message: "Event not found",
//         error: "Verify the event ID or calendar access",
//         status: 404,
//       };
//     }
//     console.error("Error retrieving event:", err);
//     return {
//       message: "Error retrieving event",
//       error: err.message,
//       status: 500,
//     };
//   }
// }
export async function getAcceptedAttendees(auth: any, eventId: string) {
  const calendar = google.calendar({ version: "v3", auth });

  try {
    // Use async/await for the Google Calendar API
    const event = await calendar.events.get({
      calendarId: "primary", // Ensure you're querying the correct calendar
      eventId: eventId,
    });

    // Extract attendees or set an empty array if none exist
    const attendees = event?.data?.attendees || [];

    // Optionally filter for "accepted" attendees
    // const acceptedAttendees = attendees.filter(
    //   (attendee) => attendee.responseStatus === "accepted"
    // );

    return {
      success: true,
      message: "Accepted attendees retrieved successfully",
      attendees: attendees,
    };
  } catch (err: any) {
    if (err.response?.status === 404) {
      console.error("Event not found. Verify the event ID or calendar access.");
      return {
        success: false,
        message: "Event not found. Verify the event ID or calendar access.",
        status: 404,
        error: err.message,
      };
    }

    console.error("Error retrieving event:", err);
    return {
      success: false,
      message: "Error retrieving event",
      status: 500,
      error: err.message,
    };
  }
}



// /**
//  * Create a new Google Calendar event.
//  * @param auth - Authenticated OAuth2 client.
//  * @param eventDetails - Details of the event to be created.
//  * @param res - Next.js API response object.
//  */


// export function createEvent(
//   auth: Auth.OAuth2Client,
//   eventDetails: {
//     summary: string;
//     location: string;
//     description: string;
//     startDateTime: string;
//     endDateTime: string;
//     timeZone: string;
//     attendees?: calendar_v3.Schema$EventAttendee[];
//   },
//   res: NextApiResponse
// ) {
//   const calendar = google.calendar({ version: "v3", auth });

//   const event: calendar_v3.Schema$Event = {
//     summary: eventDetails.summary,
//     location: eventDetails.location,
//     description: eventDetails.description,
//     start: {
//       dateTime: eventDetails.startDateTime,
//       timeZone: eventDetails.timeZone,
//     },
//     end: {
//       dateTime: eventDetails.endDateTime,
//       timeZone: eventDetails.timeZone,
//     },
//     attendees: eventDetails.attendees,
//     reminders: {
//       useDefault: false,
//       overrides: [
//         { method: "email", minutes: 24 * 60 },
//         { method: "popup", minutes: 10 },
//       ],
//     },
//   };

//   calendar.events.insert(
//     {
//       calendarId: "primary",
//       requestBody: event,
//       sendUpdates: "all",
//     },
//     (err, event) => {
//       if (err) {
//         console.error("Error contacting the Calendar service:", err);
        
//         return NextResponse.json({
//           message: "Error creating event",
//           error: err.message,
//           status: 500,
//         });
//       }
       
//       return NextResponse.json({
//         message: "Event created successfully",
//         link: event?.data?.htmlLink,
//         status: 200,
//       });
//     }
//   );
// }
