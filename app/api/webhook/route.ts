import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { NextResponse } from "next/server";
export async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const { token, org, user, webhook_url } = req.body;
  const token = process.env.ACCESS_TOKEN;
  const org =
    "https://api.calendly.com/organizations/0029f995-c014-4edf-82a7-f74ecf87ba28";
  const user =
    "https://api.calendly.com/users/82d3f20e-56d7-47fd-9b92-14d9566f5434";
  const webhook_url =
    "https://5bcf-2409-40e4-49-1d48-1da4-3d86-ff86-1f6e.ngrok-free.app";

  const baseUrl = "https://api.calendly.com";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const body = {
    url: webhook_url,
    events: ["invitee.created", "invitee.canceled"],
    organization: org,
    user: user,
    scope: "user",
  };
  try {
    const response = await axios.post(
      `${baseUrl}/webhook_subscriptions`,
      body,
      { headers }
    );
    return NextResponse.json({
      data: response.data,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
