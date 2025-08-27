// components/RouteCard.tsx
import { BaseCard } from "@/components/BaseCard";
import { StatBox } from "@/components/StatBox";
import { Badge } from "@/components/ui/badge";
import {
  getRouteStatus,
  getSeverityBg,
  getSeverityLevel,
  jamLevels,
  statusLabel,
} from "@/lib/route-utils";
import { calcTrendPercentage } from "@/lib/utils";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

interface RouteCardProps {
  route: string;
  averageTravelTime: number; // em minutos
  currentTravelTime: number; // em minutos
  jamLevel?: number;
  tolerance?: number; // em minutos (opcional)
  isUpdating?: boolean;
  isNewData?: boolean;
  trendPercentage?: number;
}

export const RouteCardTest = ({
  route,
  averageTravelTime,
  currentTravelTime,
  jamLevel,
  tolerance,
  isUpdating = false,
  isNewData = false,
  trendPercentage = 0,
}: RouteCardProps) => {
  const status = getRouteStatus(
    currentTravelTime,
    averageTravelTime,
    tolerance
  );
  const severity = getSeverityLevel(trendPercentage);
  const bgClass = getSeverityBg(severity);

  const isPositive = trendPercentage >= 0;

  return (
    <BaseCard
      title={route}
      isUpdating={isUpdating}
      isNewData={isNewData}
      className={bgClass}
      showButtons={true}
      headerAction={
        <Badge
          variant="secondary"
          className="bg-white/20 rounded-lg text-white text-opacity-70 px-1 py-0.5"
        >
          {isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
          {trendPercentage.toFixed(1)}%
        </Badge>
      }
    >
      <div className="col-span-2 flex items-center justify-between mb-2 text-white text-opacity-80 text-sm">
        <span>{statusLabel[status]}</span>
        {jamLevel !== undefined && jamLevels[jamLevel] && (
          <Badge
            variant="secondary"
            className="bg-white/20 rounded-lg text-xs text-white text-opacity-70"
          >
            {jamLevels[jamLevel]}
          </Badge>
        )}
      </div>

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
