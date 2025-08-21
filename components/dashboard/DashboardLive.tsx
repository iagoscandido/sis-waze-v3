"use client";

import { AnomalyCard } from "@/components/dashboard/AnomalyCard";
import Loading from "@/app/(public)/dashboard/loading";
import { useWazeData } from "@/lib/hooks";
import { formatDate } from "@/lib/utils";

export const DashboardLive = () => {
  const { data, isLoading, isError } = useWazeData();

  if (isLoading) return <p>Carregando...</p>;
  if (isError || !data || !data.routes || data.routes.length === 0) {
    return <p>Nenhuma rota encontrada. </p>;
  }

  const { routes, updateTime } = data;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Anomalias</h2>
        <p className="text-sm text-gray-500">
          Última atualização: {formatDate(updateTime)}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {routes.map((r) => {
          const avgTime = r.historicTime > 0 ? r.historicTime / 60 : 0;
          const currTime = r.time > 0 ? r.time / 60 : avgTime * 3;

          return (
            <AnomalyCard
              key={r.id}
              route={r.name}
              averageTravelTime={Math.round(avgTime)}
              currentTravelTime={Math.round(currTime)}
              jamLevel={r.jamLevel}
            />
          );
        })}
      </div>
    </div>
  );
};
