import fs from "fs";
import readline from "readline";
import { google, Auth } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const CREDENTIALS_PATH = "credentials.json"; // Path to credentials file
const TOKEN_PATH = "token.json"; // Path to store the token
const SCOPES = ["https://www.googleapis.com/auth/calendar"]; // Google Calendar scopes

/**
 * Generates a new token for Google API access.
 * @param res - Next.js API Response object.
 */
export const generateToken = async (res: NextApiResponse) => {
  try {
    // Load client secrets from a local file
    const content = fs.readFileSync(CREDENTIALS_PATH, "utf-8");
    const credentials = JSON.parse(content);
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Generate the authorization URL
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });

    console.log("Authorize this app by visiting this URL:", authUrl);

    // Prompt user for the authorization code
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err || !token) {
          console.error("Error retrieving access token:", err);
          return NextResponse.json({
            message: "Failed to generate token",
            status: 500,
          });
        }
        oAuth2Client.setCredentials(token);

        // Save the token to a file for future use
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        console.log("Token stored to", TOKEN_PATH);
        // res.status(200).json({ message: "Token generated successfully" });
        return NextResponse.json({
          message: "Token generated successfully",
          status: 200,
        });
      });
    });
  } catch (err) {
    console.error("Error generating token:", err);
    // res.status(500).json({ error: "Failed to generate token" });
    return NextResponse.json({
      message: "Failed to generate token",
      status: 500,
    });
  }
};

/**
 * Authorize API requests using an existing or newly generated token.
 * @param callback - Function that requires authorization.
 */
// export const authorize = async (): Promise<Auth.OAuth2Client> => {
//   try {
//     const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf-8"));
//     const { client_secret, client_id, redirect_uris } = credentials.web;

//     const oAuth2Client = new google.auth.OAuth2(
//       client_id,
//       client_secret,
//       redirect_uris[0]
//     );

//     // Check if token exists
//     if (fs.existsSync(TOKEN_PATH)) {
//       const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
//       oAuth2Client.setCredentials(token);
//       return oAuth2Client;
//     } else {
//       throw new Error(
//         "Token not found. Run the token generation process first."
//       );
//     }
//   } catch (err) {
//     console.error("Error during authorization:", err);
//     throw err; // Propagate the error to the caller
//   }
// };
 

export const authorize = async (): Promise<Auth.OAuth2Client> => {
  try {
    // Get credentials from environment variables
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    const redirect_uri = process.env.REDIRECT_URI;
    const token = process.env.TOKEN;

    if (!client_id || !client_secret || !redirect_uri || !token) {
      throw new Error("Missing required environment variables.");
    }

    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uri
    );

    // Set credentials from environment variable
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
  } catch (err) {
    console.error("Error during authorization:", err);
    throw err; // Propagate the error to the caller
  }
};
