"use client";

import * as React from "react";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchLatestIrregularitiesAction } from "@/lib/server/actions/irregularitiesActions";
import type { Irregularities, Line } from "@/lib/types/irregularities";
import { columnsIrregularities, columnsLine } from "./columns";

export default function IrregularitiesPage() {
  const [data, setData] = React.useState<Irregularities[]>([]);
  const [lines, setLines] = React.useState<Line[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchLatestIrregularitiesAction();

        setData(result);
        const allLines = result.flatMap((item) => item.line);
        setLines(allLines);
      } catch (err) {
        console.error("Erro ao carregar irregularidades:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const renderSkeletonTable = (columnsLength: number) => (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-2">
          {Array.from({ length: columnsLength }).map((_, j) => (
            <Skeleton key={j} className="h-8 flex-1 rounded-md" />
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Unusual</h1>
      <Tabs defaultValue="irregularities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="irregularities">Unusual</TabsTrigger>
          <TabsTrigger value="lines">Linhas</TabsTrigger>
        </TabsList>

        <TabsContent value="irregularities">
          {loading ? (
            renderSkeletonTable(columnsIrregularities.length)
          ) : (
            <DataTable
              columns={columnsIrregularities}
              data={data}
              filterColumn="street"
            />
          )}
        </TabsContent>

        <TabsContent value="lines">
          {loading ? (
            renderSkeletonTable(columnsLine.length)
          ) : (
            <DataTable columns={columnsLine} data={lines} filterColumn="x" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
