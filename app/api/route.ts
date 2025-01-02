import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,res:NextResponse) {
  try {
    return NextResponse.json({
      message: "Hello, World!",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to retrieve events",
      error: (error as Error).message,
      status: 500,
    });
  }
}