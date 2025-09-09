"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import WazeCard from "@/components/components-test/card-waze-clone";
import { MapButton } from "@/components/map-button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchIrregularities } from "@/lib/server/actions/irregularitiesActionTest";
import { secondsToMinutes } from "@/lib/utils/date-time";
import {
  getSeverityDescription,
  type SeverityLevel,
  type TrendLevel,
} from "@/lib/utils/waze";
import type { WazeIrregularityData } from "@/types/wazeData";

export default function WazeIrregularities() {
  const [intervalMs] = useState(1000 * 60 * 2);
  const {
    data: irregularities,
    isPending,
    isError,
    isFetching,
  } = useQuery<WazeIrregularityData[]>({
    queryKey: ["irregularities"],
    queryFn: fetchIrregularities,
    refetchOnWindowFocus: true,
    refetchInterval: intervalMs,
    staleTime: 1000 * 60 * 2,
  });

  if (isPending) return <p className="text-gray-500">Carregando...</p>;
  if (isError)
    return <div className="text-red-500">Erro ao carregar dados</div>;
  if (!irregularities || irregularities.length === 0) {
    return (
      <div className="text-gray-500">Nenhuma irregularidade encontrada</div>
    );
  }

  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center">
      {irregularities.map((i) => (
        <WazeCard
          key={i.id}
          title={i.street}
          delay={i.delaySeconds}
          seconds={i.seconds}
          trend={i.trend as TrendLevel}
          metrics={[
            {
              id: "traffic-desc",
              label: "Tráfego",
              value: `${getSeverityDescription(i.severity as SeverityLevel)}`,
            },
            { id: "cause", label: "Causa", value: i.type },
            {
              id: "avg-speed",
              label: "Velocidade atual",
              value: `${i.speed.toFixed(0)} km/h`,
              group: "speed",
            },
            {
              id: "historic-speed",
              label: "Velocidade histórica",
              value: `${i.regularSpeed.toFixed(0)} km/h`,
              group: "speed",
            },
            {
              id: "delay-time",
              label: "tempo atual",
              value: `${secondsToMinutes(i.delaySeconds + i.seconds).toFixed(0)} min`,
              group: "time",
            },
            {
              id: "historic-time",
              label: "Tempo hsitórico",
              value: `${secondsToMinutes(i.seconds).toFixed(0)} min`,
              group: "time",
            },
            {
              id: "distance",
              label: "Distância",
              value: `${(i.length * 0.001).toFixed(3)} km`,
            },
          ]}
          isUpdating={isPending}
          action={
            <MapButton
              fromLat={i.line[0].y}
              fromLon={i.line[0]?.x}
              toLat={i.line[i.line.length - 1].y}
              toLon={i.line[i.line.length - 1].x}
            />
          }
        />
      ))}
      {isFetching && <Skeleton className="w-full h-12" />}
    </main>
  );
}
