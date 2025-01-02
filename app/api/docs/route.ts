import { NextResponse } from "next/server";
import swaggerDocument from "@/swagger/swagger.json";

export const GET = async () => {
  return NextResponse.json(swaggerDocument);
};
