// app/tests/irregularities/page.tsx

import { DataTable } from "@/components/data-table";
import {
  columns,
  Jam,
} from "@/app/tests/dashboard-test/irregularities/columns";
import fs from "fs/promises";
import path from "path";

interface FullJsonData {
  jams: Jam[];
}

async function getData(): Promise<FullJsonData> {
  const filePath = path.join(
    process.cwd(),
    "data",
    "sampleIrregularities.json"
  );
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents) as FullJsonData;
}

export default async function IrregularitiesPage() {
  const fullData = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={fullData.jams} filterColumn="city" />
    </div>
  );
}
