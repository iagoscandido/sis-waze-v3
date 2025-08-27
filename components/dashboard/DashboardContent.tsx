"use client";

import { RouteCard } from "@/components/dashboard/RouteCard";
import { SortOption, SortSelect } from "@/components/SortSelect";
import { WazeRoute } from "@/lib/definitions";
import { useWazeData } from "@/lib/hooks/useWazeData";
import { calcTrendPercentageSafe } from "@/lib/utils";
import { useEffect, useState } from "react";

export const DashboardContent = () => {
  const { data, isLoading, isError, refetch, isFetching, isRefetching } =
    useWazeData();

  const [sortedRoutes, setSortedRoutes] = useState<
    (WazeRoute & { _trend: number })[]
  >([]);
  const [sortValue, setSortValue] = useState<string>("trend_desc");

  const sortOptions: SortOption[] = [
    { label: "A → Z", value: "name_asc" },
    { label: "Maior tempo", value: "time_desc" },
    { label: "Maior tendência", value: "trend_desc" },
  ];

  // Função de ordenação
  const sortRoutes = (
    routes: (WazeRoute & { _trend: number })[],
    value: string
  ) => {
    return [...routes].sort((a, b) => {
      switch (value) {
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "time_desc": {
          const aCurr = a.time > 0 ? a.time : a.historicTime;
          const bCurr = b.time > 0 ? b.time : b.historicTime;
          return bCurr - aCurr;
        }
        case "trend_desc":
        default:
          // Ordenação determinística: primeiro trend, depois currentTime
          if (b._trend !== a._trend) return b._trend - a._trend;
          const aCurr = a.time > 0 ? a.time : a.historicTime;
          const bCurr = b.time > 0 ? b.time : b.historicTime;
          return bCurr - aCurr;
      }
    });
  };

  // Atualiza sortedRoutes sempre que dados ou sortValue mudarem
  useEffect(() => {
    if (!data?.routes) return;

    // Calcula _trend de forma consistente
    const routesWithTrend = data.routes.map((route) => {
      const safeHistoricTime = route.historicTime > 0 ? route.historicTime : 1;
      const safeCurrentTime = route.time > 0 ? route.time : safeHistoricTime;
      const trend = calcTrendPercentageSafe(safeCurrentTime, safeHistoricTime);
      return { ...route, _trend: trend };
    });

    setSortedRoutes(sortRoutes(routesWithTrend, sortValue));
  }, [data?.routes, sortValue]);

  const handleSort = (value: string) => {
    setSortValue(value);
  };

  if (isLoading && !data) return <p>Carregando...</p>;
  if (isError || !data?.routes || data.routes.length === 0)
    return <p>Nenhuma rota encontrada</p>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 space-y-4">
      {/* Select de ordenação */}
      <div className="flex justify-end">
        <SortSelect
          options={sortOptions}
          defaultValue="trend_desc"
          onSort={handleSort}
        />
      </div>

      {(isFetching || isRefetching) && (
        <div className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-3 py-2 rounded-md text-sm animate-pulse">
          Atualizando dados...
        </div>
      )}

      {/* Grid de rotas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedRoutes.map((route) => {
          const avgTime = route.historicTime;
          const currTime = route.time > 0 ? route.time : avgTime;

          const severity =
            currTime > avgTime * 2
              ? "high"
              : currTime > avgTime * 1.5
              ? "medium"
              : "low";

          return (
            <div
              key={route.id}
              className={`transform transition-all duration-300 hover:scale-105 ${
                severity === "high"
                  ? "ring-2 ring-red-200"
                  : severity === "medium"
                  ? "ring-2 ring-yellow-200"
                  : ""
              }`}
            >
              <RouteCard
                route={route.name}
                averageTravelTime={Math.round(avgTime / 60)}
                currentTravelTime={Math.round(currTime / 60)}
                jamLevel={route.jamLevel}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
