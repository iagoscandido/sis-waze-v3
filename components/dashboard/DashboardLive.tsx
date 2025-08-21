"use client";

import { AnomalyCard } from "@/components/dashboard/AnomalyCard";
import { useWazeData } from "@/lib/hooks";
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";

export const DashboardLive = () => {
  const { data, isLoading, isError, refetch, isFetching, isRefetching } =
    useWazeData();
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [nextUpdate, setNextUpdate] = useState<number>(0);

  useEffect(() => {
    if (data?.updateTime) {
      setLastUpdate(new Date(data.updateTime));
    }
  }, [data?.updateTime]);

  // Atualiza nextUpdate a cada segundo, com base em lastUpdate
  useEffect(() => {
    const timer = setInterval(() => {
      if (lastUpdate) {
        const now = Date.now();
        const timeSinceUpdate = now - lastUpdate.getTime();
        const timeUntilNext = Math.max(0, 60000 - timeSinceUpdate); // 1 minuto
        setNextUpdate(Math.ceil(timeUntilNext / 1000));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastUpdate]);

  const formatNextUpdate = (seconds: number) => {
    if (seconds <= 0) return "Atualizando...";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0
      ? `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
      : `${remainingSeconds}s`;
  };

  const getConnectionStatus = () => {
    if (isLoading && !data)
      return { status: "loading", color: "text-yellow-500" };
    if (isError) return { status: "error", color: "text-red-500" };
    if (isFetching || isRefetching)
      return { status: "updating", color: "text-blue-500" };
    return { status: "connected", color: "text-green-500" };
  };

  const connectionStatus = getConnectionStatus();

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
        <div className="text-red-500 text-xl">⚠️</div>
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

  const { routes, updateTime } = data;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Header with status and controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold">Anomalias de Tráfego</h2>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`w-2 h-2 rounded-full ${
                connectionStatus.status === "connected"
                  ? "bg-green-500"
                  : connectionStatus.status === "loading"
                  ? "bg-yellow-500 animate-pulse"
                  : "bg-red-500"
              }`}
            ></span>
            <span className={`text-sm ${connectionStatus.color}`}>
              {connectionStatus.status === "connected"
                ? "Conectado"
                : connectionStatus.status === "loading"
                ? "Carregando..."
                : connectionStatus.status === "updating"
                ? "Atualizando..."
                : "Erro de conexão"}
            </span>
          </div>
        </div>

        <div className="text-right space-y-1">
          <p className="text-sm text-gray-600">
            Última atualização: {formatDate(updateTime)}
          </p>
          <p className="text-xs text-gray-500">
            Próxima em: {formatNextUpdate(nextUpdate)}
          </p>
          <button
            onClick={() => refetch()}
            disabled={isLoading || isFetching}
            className="text-xs px-2 py-1 bg-sky-500 text-white hover:bg-sky-300 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
          >
            {isLoading || isFetching ? "Atualizando..." : "Atualizar agora"}
          </button>
        </div>
      </div>

      {/* Loading overlay for updates */}
      {(isFetching || isRefetching) && data && (
        <div className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-3 py-2 rounded-md text-sm animate-pulse">
          Atualizando dados...
        </div>
      )}

      {/* Routes grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
              <AnomalyCard
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
