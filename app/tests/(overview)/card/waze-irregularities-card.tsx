"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import WazeCard from "@/components/components-test/card-waze-clone";
import { MapButton } from "@/components/map-button";
import { type SortOption, SortSelect } from "@/components/SortSelect";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertSubTypeInfo } from "@/lib/mappers/alert-subtype-info";
import { AlertTypeInfo } from "@/lib/mappers/alert-type-info";
import { fetchIrregularities } from "@/lib/server/actions/irregularitiesActionTest";
import { secondsToMinutes } from "@/lib/utils/date-time";
import {
  getSeverityDescription,
  type SeverityLevel,
  type TrendLevel,
} from "@/lib/utils/waze";
import type { WazeIrregularityData } from "@/types/wazeData";

const sortOptions: SortOption[] = [
  { label: "Mais recente", value: "recent" },
  { label: "Maior atraso", value: "delayDesc" },
  { label: "Menor atraso", value: "delayAsc" },
  { label: "Maior gravidade", value: "severityDesc" },
  { label: "Distância maior", value: "distanceDesc" },
  { label: "Maior percentual", value: "percentDesc" },
];

export default function WazeIrregularities() {
  const [intervalMs] = useState(1000 * 60 * 2);
  const [sortBy, setSortBy] = useState("percentDesc");

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

  const sortedIrregularities = useMemo(() => {
    if (!irregularities) return [];

    return [...irregularities].sort((a, b) => {
      const percentA = ((a.delaySeconds + a.seconds) / a.seconds) * 100;
      const percentB = ((b.delaySeconds + b.seconds) / b.seconds) * 100;
      switch (sortBy) {
        case "delayDesc":
          return b.delaySeconds + b.seconds - (a.delaySeconds + a.seconds);
        case "delayAsc":
          return a.delaySeconds + a.seconds - (b.delaySeconds + b.seconds);
        case "severityDesc":
          return (b.severity ?? 0) - (a.severity ?? 0);
        case "distanceDesc":
          return b.length - a.length;
        case "recent":
          return (b.updateDateMillis ?? 0) - (a.updateDateMillis ?? 0);
        case "percentDesc":
        default:
          return percentB - percentA;
      }
    });
  }, [irregularities, sortBy]);

  if (isPending) return <p className="text-gray-500">Carregando...</p>;
  if (isError)
    return <div className="text-red-500">Erro ao carregar dados</div>;
  if (!irregularities || irregularities.length === 0) {
    return (
      <div className="text-gray-500">Nenhuma irregularidade encontrada</div>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {/* Sorting Control*/}
      <div className="flex justify-end">
        <SortSelect
          options={sortOptions}
          defaultValue={sortBy}
          onSort={setSortBy}
        />
      </div>

      {/* Cards */}
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex flex-wrap gap-2 justify-center">
        {sortedIrregularities.map((i) => (
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
              {
                id: "cause",
                label: "Causa",
                value: i.causeAlert
                  ? AlertTypeInfo[i.causeAlert.type].label
                  : "",
                group: "cause",
              },
              {
                id: "cause_subtype",
                label: "Subtipo",
                value: i.causeAlert?.subtype
                  ? AlertSubTypeInfo[i.causeAlert.subtype].label
                  : "",
                group: "cause",
              },
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
                label: "Tempo atual",
                value: `${secondsToMinutes(i.delaySeconds + i.seconds).toFixed(0)} min`,
                group: "time",
              },
              {
                id: "historic-time",
                label: "Tempo histórico",
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
    </section>
  );
}
