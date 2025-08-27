import { NextResponse } from "next/server";
import irregularities from "@/data/sample-irregularities.json";

export async function GET() {
  return NextResponse.json(irregularities);
}
