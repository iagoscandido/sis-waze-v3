"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { WazeData } from "./definitions";

async function getWazeData(): Promise<WazeData> {
  const res = await fetch("/api/waze", {
    cache: "no-store",
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });

  if (!res.ok) {
    throw new Error(`Erro ao buscar dados do Waze: ${res.status}`);
  }

  return res.json();
}

export function useWazeData() {
  const queryResult = useQuery({
    queryKey: ["wazeData"],
    queryFn: getWazeData,
    refetchInterval: 60 * 1000, // 1 minute
    refetchIntervalInBackground: true, // Keep refetching even when tab is not focused
    refetchOnWindowFocus: true, // Refetch when user returns to tab
    refetchOnReconnect: true, // Refetch when network reconnects
    staleTime: 30 * 1000, // Data is considered stale after 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes (formerly cacheTime)
    retry: (failureCount, error) => {
      // Custom retry logic
      if (failureCount >= 3) return false;

      // Don't retry on 4xx errors (client errors)
      if (error instanceof Error && error.message.includes("4")) {
        return false;
      }

      return true;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  // Enhanced visibility handling
  const wasHiddenRef = useRef(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        wasHiddenRef.current = true;
      } else if (wasHiddenRef.current) {
        // Tab became visible again, trigger immediate refetch
        queryResult.refetch();
        wasHiddenRef.current = false;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [queryResult.refetch]);

  // Enhanced online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      console.log("🟢 Connection restored, fetching latest traffic data...");
      queryResult.refetch();
    };

    const handleOffline = () => {
      console.log("🔴 Connection lost - using cached data");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [queryResult.refetch]);

  // Log successful updates (helpful for debugging)
  useEffect(() => {
    if (queryResult.data?.updateTime) {
      console.log("📊 Traffic data updated:", queryResult.data.updateTime);
    }
  }, [queryResult.data?.updateTime]);

  return {
    ...queryResult,
    // Helper properties for easier usage
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    isInitialLoading: queryResult.isLoading && !queryResult.data,
    hasData: !!queryResult.data,
    routeCount: queryResult.data?.routes?.length || 0,
  };
}
