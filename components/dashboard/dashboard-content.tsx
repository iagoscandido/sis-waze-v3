"use client";

import { useEffect, useState } from "react";
import { SortOption, SortSelect } from "@/components/SortSelect";
import { RouteCard } from "@/components/dashboard/route-card";
import { sortRoutes, mapRoutes } from "@/lib/route-utils";
import { WazeRoute } from "@/lib/definitions";
import { calcTrendPercentage } from "@/lib/utils";

interface DashboardContentProps {
  initialRoutes: WazeRoute[];
}

export const DashboardContent = ({ initialRoutes }: DashboardContentProps) => {
  const [routes, setRoutes] = useState(initialRoutes);
  const [sortValue, setSortValue] = useState("trend_desc");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isUpdating, setIsUpdating] = useState(false);

  const sortOptions: SortOption[] = [
    { label: "A → Z", value: "name_asc" },
    { label: "Maior tempo", value: "time_desc" },
    { label: "Maior tendência", value: "trend_desc" },
  ];

  const handleSort = (value: string) => {
    setSortValue(value);
    setRoutes(sortRoutes(routes, value));
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setIsUpdating(true);
        const res = await fetch("/api/waze", { cache: "no-store" });
        const data = await res.json();

        const routes: WazeRoute[] = mapRoutes(data.routes).map((route) => {
          const currTime = route.time > 0 ? route.time : route.historicTime;
          return {
            ...route,
            trendPercentage: calcTrendPercentage(currTime, route.historicTime),
          };
        });

        setRoutes(sortRoutes(routes, sortValue));
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Erro ao atualizar rotas:", error);
      } finally {
        setIsUpdating(false);
      }
    };

    const interval = setInterval(fetchRoutes, 60_000);
    fetchRoutes();
    return () => clearInterval(interval);
  }, [sortValue]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 space-y-4">
      {/* Barra de ferramentas */}
      <div className="flex justify-between items-center">
        <SortSelect
          options={sortOptions}
          defaultValue="trend_desc"
          onSort={handleSort}
        />
        <div className="text-sm text-gray-500">
          Última atualização:{" "}
          {lastUpdated.toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
            timeZone: "America/Sao_Paulo",
          })}
          {isUpdating && (
            <span className="ml-2 animate-pulse text-blue-500">
              Atualizando...
            </span>
          )}
        </div>
      </div>

      {/* Grid de rotas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {routes.map((r) => {
          const avgTime = r.historicTime;
          const currTime = r.time > 0 ? r.time : avgTime;

          return (
            <RouteCard
              key={r.id}
              route={r.name}
              averageTravelTime={Math.round(avgTime / 60)}
              currentTravelTime={Math.round(currTime / 60)}
              jamLevel={r.jamLevel}
              isUpdating={isUpdating}
              trendPercentage={r.trendPercentage}
            />
          );
        })}
      </div>
    </div>
  );
};
