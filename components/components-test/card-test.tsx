"use client";

import { Badge } from "@/components/ui/badge";
import { BaseCard } from "@/components/BaseCard";
import { StatBox } from "@/components/StatBox";
import { calcTrendPercentageSafe } from "@/lib/utils";
import { useEffect, useState } from "react";

interface CardRouteTestProps {
  route: string;
  averageTravelTime: number;
  currentTravelTime: number;
  jamLevel?: number;
  tolerance?: number;
  isUpdating?: boolean;
}

type Status = "low" | "normal" | "high" | "critical";

export const RouteCardTest = ({
  route,
  averageTravelTime,
  currentTravelTime,
  jamLevel,
  tolerance = currentTravelTime * 0.3,
  isUpdating = false,
}: CardRouteTestProps) => {
  const [isNewData, setIsNewData] = useState(false);
  const [previousTime, setPreviousTime] = useState(currentTravelTime);

  useEffect(() => {
    if (previousTime !== currentTravelTime && previousTime !== 0) {
      setIsNewData(true);
      const timer = setTimeout(() => setIsNewData(false), 2000);
      return () => clearTimeout(timer);
    }
    setPreviousTime(currentTravelTime);
  }, [currentTravelTime, previousTime]);

  let status: Status = "normal";

  if (currentTravelTime <= averageTravelTime - tolerance) {
    status = "low";
  } else if (currentTravelTime >= averageTravelTime + tolerance) {
    status = "high";
  } else {
    status = "normal";
  }

  const statusLabel: Record<Status, string> = {
    low: "Abaixo da média",
    normal: "Dentro da média",
    high: "Acima da média",
    critical: "Muito acima da média",
  };

  const jamLevels: Record<number, { label: string }> = {
    0: { label: "Sem Trânsito" },
    1: { label: "Trânsito leve" },
    2: { label: "Trânsito Moderado" },
    3: { label: "Trânsito Intenso" },
    4: { label: "Trânsito Muito intenso" },
  };

  const trendPercentage = calcTrendPercentageSafe(
    currentTravelTime,
    averageTravelTime
  );

  const getSeverityLevel = (): Status => {
    const p = trendPercentage;
    if (p <= 30) return "low";
    if (p <= 80) return "normal";
    if (p <= 100) return "high";
    return "critical";
  };

  const severity = getSeverityLevel();

  const severityBg: Record<Status, string> = {
    low: "bg-green-900",
    normal: "bg-yellow-900",
    high: "bg-red-900",
    critical: "bg-purple-900",
  };

  return (
    <BaseCard
      title={route}
      isUpdating={isUpdating}
      isNewData={isNewData}
      className={severityBg[severity]}
      headerAction={
        trendPercentage !== 0 && (
          <Badge
            variant="secondary"
            className="bg-white/20 rounded-lg text-white text-opacity-70 px-1 py-0.5"
          >
            {trendPercentage > 0 ? "+" : ""}
            {trendPercentage.toFixed(1)}%
          </Badge>
        )
      }
    >
      {/* Linha de status e trânsito */}
      <div className="col-span-2 flex items-center justify-between mb-2 text-white text-opacity-80 text-sm">
        <span>{statusLabel[status]}</span>
        {jamLevel !== undefined && jamLevels[jamLevel] && (
          <Badge
            variant="secondary"
            className="bg-white/20 rounded-lg text-xs text-white text-opacity-70"
          >
            {jamLevels[jamLevel].label}
          </Badge>
        )}
      </div>
      {/* Métricas */}
      <StatBox
        label="Média Atual"
        value={`${currentTravelTime.toFixed(0)} min`}
        highlight={isNewData}
      />
      <StatBox
        label="Média Histórica"
        value={`${averageTravelTime.toFixed(0)} min`}
      />
    </BaseCard>
  );
};
