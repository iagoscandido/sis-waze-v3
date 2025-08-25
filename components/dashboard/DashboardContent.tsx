"use client";

import { useState, useEffect } from "react";
import { RouteCard } from "@/components/dashboard/RouteCard";
import { useWazeData } from "@/lib/hooks/useWazeData";
import DashboardHeadder from "./DashboardContentHeadder";
import { SortSelect, SortOption } from "@/components/SortSelect";
import { WazeRoute } from "@/lib/definitions";

export const DashboardContent = () => {
  const { data, isLoading, isError, refetch, isFetching, isRefetching } =
    useWazeData();

  const [sortedRoutes, setSortedRoutes] = useState<WazeRoute[]>([]);

  useEffect(() => {
    if (data?.routes) {
      setSortedRoutes(data.routes);
    }
  }, [data?.routes]);

  const sortOptions: SortOption[] = [
    { label: "A → Z", value: "asc" },
    { label: "Z → A", value: "desc" },
  ];

  const handleSort = (value: string) => {
    if (!data?.routes) return;
    const sorted = [...data.routes].sort((a, b) =>
      value === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setSortedRoutes(sorted);
  };

  if (isLoading && !data) return <p>Carregando...</p>;
  if (isError || !data?.routes || data.routes.length === 0)
    return <p>Nenhuma rota encontrada</p>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 space-y-4">
      <DashboardHeadder />

      {/* Select de ordenação */}
      <div className="flex justify-end">
        <SortSelect options={sortOptions} onSort={handleSort} />
      </div>

      {(isFetching || isRefetching) && (
        <div className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-3 py-2 rounded-md text-sm animate-pulse">
          Atualizando dados...
        </div>
      )}

      {/* Grid de rotas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedRoutes.map((route) => {
          const avgTime = route.historicTime > 0 ? route.historicTime / 60 : 0;
          const currTime = route.time > 0 ? route.time / 60 : avgTime * 3;

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
                averageTravelTime={Math.round(avgTime)}
                currentTravelTime={Math.round(currTime)}
                jamLevel={route.jamLevel}
                lat={route.lat}
                lon={route.lon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
