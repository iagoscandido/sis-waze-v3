"use client";

import { useEffect, useState } from "react";
import { AnomalyCard } from "@/components/dashboard/AnomalyCard";
import { WazeData, WazeRoute } from "@/lib/definitions";
import Loading from "@/app/(public)/dashboard/loading";

export const DashboardLive = () => {
  const [routes, setRoutes] = useState<WazeRoute[]>([]);
  const [updateTime, setUpdateTime] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch("/api/waze");
        const data: WazeData = await res.json();

        setRoutes(data.routes || []);
        setUpdateTime(data.updateTime || Date.now());
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();

    const interval = setInterval(loadData, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loading />;
  if (!routes.length) return <p>Nenhuma rota encontrada 🚗</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {routes.map((r) => {
        // Converte segundos para minutos
        const avgTime = r.historicTime > 0 ? r.historicTime / 60 : 0;
        const currTime = r.time > 0 ? r.time / 60 : avgTime * 3;

        const updatedAt = new Date(updateTime).toLocaleString("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
          timeZone: "America/Sao_Paulo",
        });

        return (
          <AnomalyCard
            key={r.id}
            route={r.name}
            averageTravelTime={Math.round(avgTime)}
            currentTravelTime={Math.round(currTime)}
            jamLevel={r.jamLevel}
          >
            <p className="text-xs text-gray-500">
              Última atualização: {updatedAt}
            </p>
          </AnomalyCard>
        );
      })}
    </div>
  );
};
