import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// Replace 'YOUR_CALENDLY_API_KEY' with your actual Calendly API key
// const apiToken = "YOUR_CALENDLY_API_KEY";




const CALENDLY_API_TOKEN = process.env.ACCESS_TOKEN;

// Function to create an event in Calendly
export  async function GET(req:NextApiRequest, res:NextApiResponse) {
 
    const apiUrl = "https://api.example.com/scheduled_events";
    const token = process.env.ACCESS_TOKEN;

    try {
      // Make the API request
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Respond with the list of scheduled events
        return NextResponse.json({
          data: response.data,
        });
      } else {
        // Respond with an error message
        return NextResponse.json({
          error: "Error fetching scheduled events",
        });
      }
    } catch (error) {
      // Respond with an error message
      return NextResponse.json({
        error: "Error fetching scheduled events",
      });
    }
   
}

















// Function to create a meeting
// export async function POST(req: NextRequest, res: NextResponse) {
//     const url = "https://api.calendly.com/scheduled_events

//     const eventDetails = {
//       start_time: "2024-12-24T10:00:00Z",
//       end_time: "2024-12-24T10:30:00Z",
//       invitee_email: "invitee@example.com",
//       event_type: "One-on-One",
//       timezone: "Asia/Calcutta", // Add your time zone
//       scheduling_settings: {
//         minimum_scheduling_notice: 24, // Minimum hours notice required
//         allow_guests: true, // Allow invitees to bring guests
//         available_days: [
//           "monday",
//           "tuesday",
//           "wednesday",
//           "thursday",
//           "friday",
//         ],
//         available_hours: [
//           { day: "monday", start: "09:00", end: "17:00" },
//           { day: "tuesday", start: "09:00", end: "17:00" },
//           { day: "wednesday", start: "09:00", end: "17:00" },
//           { day: "thursday", start: "09:00", end: "17:00" },
//           { day: "friday", start: "09:00", end: "17:00" },
//         ],
//       },
//     };

//     const headers = {
//       Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
//       "Content-Type": "application/json",
//     };

//     try {
//         const response = await axios.post(url, eventDetails, { headers: headers });
//         return NextResponse.json({
//             data: response.data,
//             message: "Meeting created successfully",
//             err: {},
//             success: true,
//         });
        
//     } catch (error) {
//         return NextResponse.json({
//             data: {},
//             message: "Error creating meeting",
//             err: error,
//             success: false,
//         });
//     }
// }

// Call the function to create a meeting

// export async function GET() {
//     const options = {
//         method: 'GET',
//         url: 'https://auth.calendly.com/oauth/authorize',
//         params: {
//             client_id: clientId,
//             response_type: 'code',
//             redirect_uri: redirectUri,
//             code_challenge_method: 'S256',
//             code_challenge: 'CODE_CHALLENGE'
//         }
//     };
//     try {
//         const response = await axios.request(options);
//         return response.data;
//     } catch (error) {
//         return error;
//     }
// }

//autherization code: s48VjTbIzv4JZsriGVealii4MiBN3wpTigHKGQTzAyE
//url: https://auth.calendly.com/oauth/authorize?client_id=yJpiSX-OpJ1naCnaKhO5IxVx2gHOlMcBgQRzQ6PoZAY&response_type=code&redirect_uri=http://localhost:3000/oauth/callback&code_challenge_method=S256&code_challenge=CODE_CHALLENGE
