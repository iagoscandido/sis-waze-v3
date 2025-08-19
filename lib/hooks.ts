"use client";

import { useQuery } from "@tanstack/react-query";
import { WazeData } from "./definitions";

async function getWazeData(): Promise<WazeData> {
  const res = await fetch("/api/waze");
  if (!res.ok) {
    throw new Error("Erro ao buscar dados do Waze");
  }
  return res.json();
}

export function useWazeData() {
  return useQuery({
    queryKey: ["wazeData"],
    queryFn: getWazeData,
    refetchInterval: 60 * 1000, // 1 minuto
  });
}
