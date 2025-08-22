"use client";

import { RouteCard } from "@/components/dashboard/RouteCard";
import { useWazeData } from "@/lib/hooks/useWazeData";
import DashboardHeadder from "./DashboardContentHeadder";

export const DashboardContent = () => {
  const { data, isLoading, isError, refetch, isFetching, isRefetching } =
    useWazeData();

  if (isLoading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-pulse flex space-x-4 w-full max-w-md">
          <div className="rounded-full bg-gray-300 h-10 w-10"></div>
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
        <p className="text-gray-500">Carregando dados em tempo real...</p>
      </div>
    );
  }

  if (isError || !data || !data.routes || data.routes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-red-500 text-xl"></div>
        <div className="text-center">
          <p className="text-gray-700 font-medium">Nenhuma rota encontrada</p>
          <p className="text-gray-500 text-sm mt-2">
            Verifique sua conexão ou tente novamente
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  const { routes } = data;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Header with status and controls */}
      <DashboardHeadder />

      {/* Loading overlay for updates */}
      {(isFetching || isRefetching) && data && (
        <div className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-3 py-2 rounded-md text-sm animate-pulse">
          Atualizando dados...
        </div>
      )}

      {/* Routes grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
        {routes.map((route) => {
          const avgTime = route.historicTime > 0 ? route.historicTime / 60 : 0;
          const currTime = route.time > 0 ? route.time / 60 : avgTime * 3;

          // Calculate severity for visual feedback
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
              />
            </div>
          );
        })}
      </div>

      {/* Stats footer */}
      <div className="mt-8 text-center text-sm text-gray-500 border-t pt-4">
        <p>
          Monitorando {routes.length} rota{routes.length !== 1 ? "s" : ""} •
          Atualização automática a cada minuto
        </p>
      </div>
    </div>
  );
};
