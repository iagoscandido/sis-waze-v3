import { columnsWazeRoute } from "@/app/(private)/tables/(columns)/columns-waze-route";
import { DataTable } from "@/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  columnsBbox,
  columnsIrregularities,
  columnsLeadAlert,
  columnsLengthOfJams,
  columnsLine,
  columnsRoute,
  columnsSubRoute,
} from "@/app/(private)/tables/columns";
import { JsonData } from "@/lib/definitions";
import fs from "fs/promises";
import path from "path";

async function getJsonData(): Promise<JsonData> {
  const filePath = path.join(process.cwd(), "data", "example.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return JSON.parse(fileContents) as JsonData;
}

export default async function DashboardPage() {
  const data = await getJsonData();

  return (
    <div className="container mx-auto py-10">
      <Tabs defaultValue="routes" className="space-y-6">
        {/* Tabs Header */}
        <TabsList className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-2">
          <TabsTrigger value="routes">Rotas</TabsTrigger>
          <TabsTrigger value="lengthOfJams">Comprimento Jams</TabsTrigger>
          <TabsTrigger value="allRoutes">Rotas Detalhadas</TabsTrigger>
          <TabsTrigger value="subRoutes">Subrotas</TabsTrigger>
          <TabsTrigger value="irregularities">Irregularidades</TabsTrigger>
          <TabsTrigger value="leadAlert">Alertas</TabsTrigger>
          <TabsTrigger value="lineBbox">Line/BBox</TabsTrigger>
        </TabsList>

        {/* Rotas */}
        <TabsContent value="routes">
          <DataTable
            columns={columnsWazeRoute}
            data={data.routes}
            filterColumn="name"
          />
        </TabsContent>

        {/* Comprimento dos Jams */}
        <TabsContent value="lengthOfJams">
          <DataTable columns={columnsLengthOfJams} data={data.lengthOfJams} />
        </TabsContent>

        {/* Rotas Detalhadas */}
        <TabsContent value="allRoutes">
          <DataTable columns={columnsRoute} data={data.routes} />
        </TabsContent>

        {/* Subrotas */}
        <TabsContent value="subRoutes">
          <DataTable
            columns={columnsSubRoute}
            data={data.routes.flatMap((r) => r.subRoutes)}
          />
        </TabsContent>

        {/* Irregularidades */}
        <TabsContent value="irregularities">
          <DataTable
            columns={columnsIrregularities}
            data={data.irregularities}
          />
        </TabsContent>

        {/* Alertas */}
        <TabsContent value="leadAlert">
          <DataTable
            columns={columnsLeadAlert}
            data={data.irregularities.flatMap((ir) => ir.leadAlert)}
          />
        </TabsContent>

        {/* Line + BBox */}
        <TabsContent value="lineBbox">
          <h3 className="font-semibold mb-2">Coordenadas (Line)</h3>
          <DataTable
            columns={columnsLine}
            data={data.routes.flatMap((r) => r.line)}
          />
          <h3 className="font-semibold mt-6 mb-2">Bounding Boxes (BBox)</h3>
          <DataTable
            columns={columnsBbox}
            data={data.routes.flatMap((r) => r.bbox)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
