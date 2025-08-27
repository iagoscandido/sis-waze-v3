"use client";

import {
  columnsCoordinates,
  columnsIrregularities,
  columnsLengthOfJams,
  columnsRoutes,
} from "@/app/(private)/waze-routes-test/tables/columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Coordinates,
  Irregularities,
  LengthOfJams,
  Routes,
  WazeData,
} from "@/lib/types/routes-definitions";
import * as React from "react";

export default function WazeDataPage() {
  const [routes, setRoutes] = React.useState<Routes[]>([]);
  const [lengths, setLengths] = React.useState<LengthOfJams[]>([]);
  const [irregularities, setIrregularities] = React.useState<Irregularities[]>(
    []
  );
  const [coordinates, setCoordinates] = React.useState<Coordinates[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchWazeData();
        setRoutes(data.routes);
        setLengths(data.lengthOfJams);
        setIrregularities(data.irregularities);

        // Combina todas as coordenadas das rotas e irregularidades
        const allCoordinates: Coordinates[] = [
          ...data.routes.flatMap((r) => r.line),
          ...data.irregularities.flatMap((i) => i.line),
        ];
        setCoordinates(allCoordinates);
      } catch (err) {
        console.error("Erro ao carregar dados do Waze:", err);
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
      <h1 className="text-2xl font-bold">Dados do Waze</h1>
      <Tabs defaultValue="routes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="routes">Rotas</TabsTrigger>
          <TabsTrigger value="lengthOfJams">Comprimento de Jams</TabsTrigger>
          <TabsTrigger value="irregularities">Irregularidades</TabsTrigger>
          <TabsTrigger value="coordinates">Coordenadas</TabsTrigger>
        </TabsList>

        {/* Rotas */}
        <TabsContent value="routes">
          {loading ? (
            renderSkeletonTable(columnsRoutes.length)
          ) : (
            <DataTable
              columns={columnsRoutes}
              data={routes}
              filterColumn="fromName"
            />
          )}
        </TabsContent>

        {/* Comprimento de Jams */}
        <TabsContent value="lengthOfJams">
          {loading ? (
            renderSkeletonTable(columnsLengthOfJams.length)
          ) : (
            <DataTable
              columns={columnsLengthOfJams}
              data={lengths}
              filterColumn="jamLevel"
            />
          )}
        </TabsContent>

        {/* Irregularidades */}
        <TabsContent value="irregularities">
          {loading ? (
            renderSkeletonTable(columnsIrregularities.length)
          ) : (
            <DataTable
              columns={columnsIrregularities}
              data={irregularities}
              filterColumn="street"
            />
          )}
        </TabsContent>

        {/* Coordenadas */}
        <TabsContent value="coordinates">
          {loading ? (
            renderSkeletonTable(columnsCoordinates.length)
          ) : (
            <DataTable
              columns={columnsCoordinates}
              data={coordinates}
              filterColumn="x"
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Função para buscar dados do Waze
async function fetchWazeData(): Promise<WazeData> {
  const url =
    process.env.WAZE_API_URL ??
    `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/waze`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Falha ao buscar dados do Waze: ${res.status}`);
  }
  return res.json();
}
