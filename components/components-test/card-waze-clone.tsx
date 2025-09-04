import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import type { FC, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { CardAction } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getTrendingPercentage } from "@/lib/utils/math";
import { getPercentageLevel, getSeverityBg } from "@/lib/utils/route-utils";

export type Metric = {
  id: string;
  label: string;
  value?: ReactNode;
  group?: string; // agrupa métricas relacionadas
};

export type WazeCardProps = {
  title?: string;
  updatedAgo?: string;
  delay: number;
  seconds: number;
  severity: number;
  isNewData?: boolean;
  isUpdating?: boolean;
  action?: ReactNode;
  metrics?: Metric[];
};

const WazeCard: FC<WazeCardProps> = ({
  title,
  updatedAgo,
  delay,
  seconds,

  isNewData = false,
  isUpdating = false,
  action,
  metrics = [],
}) => {
  const trendingPercentage = getTrendingPercentage(delay, seconds);
  const severityLevel = getPercentageLevel(trendingPercentage);
  const bgClass = getSeverityBg(severityLevel);

  // Filtra apenas métricas com valor
  const visibleMetrics = metrics.filter(
    (m) => m.value != null && m.value !== "",
  );

  // Agrupa métricas por group
  const groupedMetrics = visibleMetrics.reduce<Record<string, Metric[]>>(
    (acc, metric) => {
      const group = metric.group || metric.id;
      if (!acc[group]) acc[group] = [];
      acc[group].push(metric);
      return acc;
    },
    {},
  );

  return (
    <div
      className={cn(
        "relative w-80 rounded-lg border border-gray-300 bg-white shadow-md overflow-hidden transition duration-300 hover:scale-102",
        {
          "ring-4 ring-primary/30": isUpdating,
          "ring-4 ring-green-300 dark:ring-green-600 ring-opacity-75 animate-pulse":
            isNewData,
        },
      )}
    >
      {/* Indicador de severidade */}
      <div className={`w-full h-2 ${bgClass}`} />

      {/* Conteúdo */}
      <div className="p-4 space-y-2">
        {/* Cabeçalho */}
        <header className="flex justify-between">
          <h2 className="font-bold text-gray-800">{title}</h2>
          <CardAction>
            <Badge
              variant="primary"
              className={`bg-white/20 rounded-lg text-xs text-white text-opacity-70 ${bgClass}`}
            >
              {trendingPercentage < 0 ? (
                <TrendingUpIcon />
              ) : (
                <TrendingDownIcon />
              )}
              {trendingPercentage.toFixed(2)}%
            </Badge>
          </CardAction>
        </header>

        {/* Métricas agrupadas */}
        <div className="space-y-0.5">
          {Object.entries(groupedMetrics).map(([groupName, group]) => (
            <div key={groupName} className="flex flex-wrap gap-4">
              {group.map((metric) => (
                <div key={metric.id} className="flex flex-col">
                  <span className="text-gray-500 text-xs">{metric.label}</span>
                  <span className="font-medium text-gray-700">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Data de atualização */}
        {updatedAgo && <p className="text-gray-500 text-sm">{updatedAgo}</p>}
      </div>
      <br />
      <footer className="flex justify-end items-center p-2 border-t border-gray-200 ">
        {action && (
          <div>
            <CardAction>
              <Badge
                className={`bg-white/20 rounded-lg text-xs text-white text-opacity-70 ${bgClass}`}
              >
                {action}
              </Badge>
            </CardAction>
          </div>
        )}
      </footer>
    </div>
  );
};

export default WazeCard;
