import { NextResponse } from "next/server";
import rawData from "@/data/sample-irregularities.json";

export async function GET() {
  return NextResponse.json({ irregularities: rawData.irregularities ?? [] });
}
