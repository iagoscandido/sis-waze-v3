import path from "path";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import { JsonData } from "@/lib/definitions";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "example.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data: JsonData = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading or parsing the file:", error);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
