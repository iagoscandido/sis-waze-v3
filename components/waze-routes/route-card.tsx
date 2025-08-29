import { BaseCard } from "@/components/BaseCard";
import {
  getRouteStatus,
  getSeverityBg,
  getSeverityLevel,
  jamLevels,
  statusLabel,
} from "@/lib/utils/route-utils";
import { Separator } from "../ui/separator";

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

  return (
    <BaseCard
      lat={lat}
      lon={lon}
      title={route}
      isUpdating={isUpdating}
      isNewData={isNewData}
      className={bgClass}
      showButtons={true}
      fromLat={fromLat}
      fromLon={fromLon}
      trendingPercentage={trendPercentage}
    >
      <div className="flex flex-wrap gap-1 text-white text-opacity-80 text-md text-pretty">
        <p>Status: {`${statusLabel[status]}`}</p>
        <Separator />
        <p>Tráfego: {`${jamLevels[jamLevel]}`}</p>
        <Separator />
        <p>Média Atual: {`${currentTravelTime.toFixed(0)} min`}</p>
        <Separator />
        <p>Média Histórica: {`${averageTravelTime.toFixed(0)} min`}</p>
      </div>
    </BaseCard>
  );
};
