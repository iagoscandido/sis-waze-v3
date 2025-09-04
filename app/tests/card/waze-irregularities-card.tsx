"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import WazeCard from "@/components/components-test/card-waze-clone";
import { MapButton } from "@/components/map-button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchIrregularities } from "@/lib/server/actions/irregularitiesActionTest";
import type { Irregularities } from "@/lib/types/irregularities";
import { secondsToMinutes, timeAgo } from "@/lib/utils/date-time";
import { getTrafficDescription } from "@/lib/utils/waze";

export default function WazeIrregularities() {
  const [intervalMs] = useState(1000 * 60 * 2);
  const {
    data: irregularities,
    isPending,
    isError,
    isFetching,
  } = useQuery<Irregularities[]>({
    queryKey: ["irregularities"],
    queryFn: fetchIrregularities,
    refetchOnWindowFocus: true,
    refetchInterval: intervalMs,
    staleTime: 1000 * 60 * 2,
  });

  // 🔄 estados de carregamento e erro
  if (isPending) return <Skeleton className="w-full h-32" />;
  if (isError)
    return <div className="text-red-500">Erro ao carregar dados</div>;
  if (!irregularities || irregularities.length === 0) {
    return (
      <div className="text-gray-500">Nenhuma irregularidade encontrada</div>
    );
  }

  return (
    <main className="flex flex-wrap justify-center-safe gap-2">
      {irregularities.map((i) => (
        <WazeCard
          key={i.id}
          title={i.street}
          delay={i.delaySeconds}
          seconds={i.seconds}
          severity={i.severity}
          updatedAgo={timeAgo(i.updateDate)}
          metrics={[
            {
              id: "traffic-desc",
              label: "Tráfego",
              value: `${getTrafficDescription(i.severity)}`,
            },
            { id: "cause", label: "Causa", value: i.causeType },
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
              id: "drive-time",
              label: "Tempo dirigindo",
              value: `${secondsToMinutes(i.seconds).toFixed(0)} min`,
              group: "time",
            },
            {
              id: "delay-time",
              label: "Atraso",
              value: `${secondsToMinutes(i.delaySeconds).toFixed(0)} min`,
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
              fromLon={i.line[0].x}
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
