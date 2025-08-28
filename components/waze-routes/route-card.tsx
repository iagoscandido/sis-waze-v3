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
} from "@/lib/utils/route-utils";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

interface RouteCardProps {
  route: string;
  averageTravelTime: number; // em minutos
  currentTravelTime: number; // em minutos
  jamLevel: number;
  tolerance?: number; // em minutos (opcional)
  isUpdating?: boolean;
  isNewData?: boolean;
  trendPercentage?: number;
  lat: number;
  lon: number;
  zoom?: number;
  navigate?: boolean;
  fromLat: number;
  fromLon: number;
}

export const RouteCard = ({
  route,
  averageTravelTime,
  currentTravelTime,
  jamLevel,
  tolerance,
  isUpdating = false,
  isNewData = false,
  trendPercentage = 0,
  lat,
  lon,
  zoom = 17,
  navigate = true,
  fromLat,
  fromLon,
}: RouteCardProps) => {
  const status = getRouteStatus(
    currentTravelTime,
    averageTravelTime,
    tolerance,
  );
  const severity = getSeverityLevel(trendPercentage);
  const bgClass = getSeverityBg(severity);

  const isPositive = trendPercentage >= 0;

  return (
    <BaseCard
      lat={lat}
      lon={lon}
      zoom={zoom}
      navigate={navigate}
      title={route}
      isUpdating={isUpdating}
      isNewData={isNewData}
      className={bgClass}
      showButtons={true}
      fromLat={fromLat}
      fromLon={fromLon}
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
      <div className="col-span-full flex flex-col space-y-2 mb-2 text-white text-opacity-80 text-sm">
        <StatBox
          label="Status"
          value={`${statusLabel[status]}`}
          label2={"Tráfego"}
          value2={`${jamLevels[jamLevel]}`}
        />
        <StatBox
          label="Média Atual"
          value={`${currentTravelTime.toFixed(0)} min`}
          highlight={isNewData}
          label2="Média Histórica"
          value2={`${averageTravelTime.toFixed(0)} min`}
        />
      </div>
    </BaseCard>
  );
};
