import type { FC, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TrendLevel } from "@/lib/utils/irregularities-utils";
import {
  getPercentageVisuals,
  getTrendVisuals,
} from "@/lib/utils/irregularities-utils";

export type Metric = {
  id: string;
  label: string;
  value?: ReactNode;
  group?: string;
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
  trend: TrendLevel;
  className?: string;
};

const WazeCard: FC<WazeCardProps> = ({
  title,
  delay,
  seconds,
  isNewData = false,
  isUpdating = false,
  action,
  severity,
  metrics = [],
  trend,
}) => {
  const trendVisuals = getTrendVisuals(trend);
  const PercentageVisuals = getPercentageVisuals(seconds + delay, delay);

  const visibleMetrics = metrics.filter(
    (m) => m.value != null && m.value !== "",
  );

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
        "relative w-80 rounded-lg bg-neutral-900 shadow-lg overflow-hidden",
        "transition duration-300 hover:scale-102 flex flex-col",
        "border-t-4",
        // severityColors.border,
        PercentageVisuals.bgColor,
        {
          "ring-2 ring-blue-500": isUpdating,
          "ring-2 ring-green-500 animate-pulse": isNewData,
        },
      )}
    >
      <div className="flex-grow p-4 space-y-4">
        {" "}
        {/* header */}
        <header className="flex justify-between items-center gap-1">
          <h2 className={cn("font-bold text-pretty")}>
            {title || "Não informado"}
          </h2>

          {/* icons */}
          <div className="flex items-center gap-1">
            {/* Trend Icon */}
            <Badge
              className={cn("text-white rounded-md", trendVisuals.bgColor)}
            >
              {}
              <trendVisuals.icon size={16} />
            </Badge>
            {/* Trending Percentage */}
            <Badge
              className={cn("text-white rounded-md", PercentageVisuals.badgeBg)}
            >
              {}
              <PercentageVisuals.icon size={16} />
              {PercentageVisuals.percentage.toFixed(1)}%
            </Badge>
          </div>
        </header>
        {/* Métricas agrupadas */}
        <div className="space-y-3">
          {Object.entries(groupedMetrics).map(([groupName, group]) => (
            <div key={groupName} className="flex flex-wrap -mx-2">
              {group.map((metric) => (
                <div key={metric.id} className="flex flex-col px-2">
                  {/* 4. Hierarquia visual clara: label mais sutil, valor em destaque */}
                  <span className="text-neutral-400 text-xs uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <span className="font-semibold text-base text-neutral-100">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer com informações de tempo e ação */}
      <footer className="flex-shrink-0 flex justify-between items-center p-3 border-t border-white/10">
        {action && (
          <Badge
            className={cn("text-white rounded-md", PercentageVisuals.bgColor)}
          >
            {action}
          </Badge>
        )}
      </footer>
    </div>
  );
};

export default WazeCard;
