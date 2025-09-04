import { MapPinIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import type { FC, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { CardAction } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getTrendingPercentage } from "@/lib/utils/math";
import { getPercentageLevel, getSeverityBg } from "@/lib/utils/route-utils";

type Props = {
  title?: string;
  street?: string;
  city?: string;
  avgSpeed?: string;
  drivingTime?: string;
  updatedAgo?: string;

  delay: number;
  seconds: number;

  isNewData?: boolean;
  isUpdating?: boolean;

  action?: ReactNode;

  description?: string;
  length?: string;
};

const CardTemplateTest: FC<Props> = ({
  title = "Trânsito parado",
  street = "Av. Pastor Martin Luther King Jr.",
  city = "Rio de Janeiro",
  avgSpeed = "5 km/h",
  drivingTime = "2 minutos",
  updatedAgo = "1 minuto atrás",
  delay,
  seconds,
  isNewData = false,
  isUpdating = false,
  action,
  description,
  length,
}) => {
  const trendingPercentage = getTrendingPercentage(delay, seconds);
  const severityLevel = getPercentageLevel(trendingPercentage);
  const bgClass = getSeverityBg(severityLevel);

  return (
    <div
      className={cn(
        "relative w-80 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-transform duration-300 hover:scale-[1.02]",
        {
          "ring-2 ring-primary/30": isUpdating,
          "ring-2 ring-green-400 animate-pulse": isNewData,
        },
      )}
    >
      {/* Linha colorida de severidade */}
      <div className={`w-full h-1.5 ${bgClass}`} />

      {/* Conteúdo */}
      <div className="p-4 space-y-2">
        {/* Título + trending */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <Badge
            className={cn(
              "rounded-lg text-xs flex items-center gap-1 px-2 py-1",
              bgClass,
            )}
          >
            {trendingPercentage < 0 ? (
              <TrendingUpIcon className="h-3 w-3" />
            ) : (
              <TrendingDownIcon className="h-3 w-3" />
            )}
            {Math.abs(trendingPercentage).toFixed(1)}%
          </Badge>
        </div>

        {/* Endereço */}
        <p className="text-sm text-gray-600">
          <MapPinIcon className="inline h-4 w-4 text-gray-400 mr-1" />
          {street}, {city}
        </p>

        {/* Métricas */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p className="text-gray-700">
            <span className="font-medium">{avgSpeed}</span>
            <br />
            Velocidade
          </p>
          <p className="text-gray-700">
            <span className="font-medium">{drivingTime}</span>
            <br />
            Tempo
          </p>
          <p className="text-gray-700">
            <span className="font-medium">{length}</span>
            <br />
            Distância
          </p>
          <p className="text-gray-500 text-xs self-end">{updatedAgo}</p>
        </div>
      </div>

      {/* Rodapé */}
      <div className="flex justify-between items-center border-t border-gray-100 px-4 py-2 bg-gray-50">
        <span className="text-sm text-gray-700 truncate">{description}</span>
        {action && <CardAction className="ml-2">{action}</CardAction>}
      </div>
    </div>
  );
};

export default CardTemplateTest;
