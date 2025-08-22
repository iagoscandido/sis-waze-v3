import { useWazeData } from "@/lib/hooks/useWazeData";
import { useEffect, useState } from "react";

export function useDashboardStatus() {
  const { data, isLoading, isError, refetch, isFetching, isRefetching } =
    useWazeData();

  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    if (data?.updateTime) {
      setLastUpdate(new Date(data.updateTime));
    }
  }, [data?.updateTime]);

  const updateTime = lastUpdate?.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  });

  const getConnectionStatus = () => {
    if (isLoading && !data)
      return { status: "loading", color: "text-yellow-500" };
    if (isError) return { status: "error", color: "text-red-500" };
    if (isFetching || isRefetching)
      return { status: "updating", color: "text-blue-500" };
    return { status: "connected", color: "text-green-500" };
  };

  return {
    connectionStatus: getConnectionStatus(),
    updateTime,
    refetch,
    isLoading,
    isFetching,
  };
}
