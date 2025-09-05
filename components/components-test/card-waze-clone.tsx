import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import type { FC, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getTrendingPercentage } from "@/lib/utils/math";
import { getPercentageLevel, getSeverityColors } from "@/lib/utils/route-utils";

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

  const severityColors = getSeverityColors(severityLevel);

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
        severityColors.border,
        {
          "ring-2 ring-blue-500": isUpdating,
          "ring-2 ring-green-500 animate-pulse": isNewData,
        },
      )}
    >
      <div className="flex-grow p-4 space-y-4">
        {" "}
        {/* Aumentado o space-y */}
        {/* Cabeçalho */}
        <header className="flex justify-between items-center">
          {/* 2. Título agora usa a cor de severidade para destaque */}
          <h2 className={cn("font-bold text-lg", severityColors.text)}>
            {title}
          </h2>
          <Badge
            className={cn(
              // 3. Badge com fundo sutil e texto branco para alto contraste
              "text-xs text-white rounded-md",
              severityColors.badgeBg,
            )}
          >
            {trendingPercentage > 0 ? (
              <TrendingUpIcon size={16} className="inline-block mr-1" />
            ) : (
              <TrendingDownIcon size={16} className="inline-block mr-1" />
            )}
            {trendingPercentage.toFixed(2)}%
          </Badge>
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
        {/* 5. Texto de atualização com cor sutil */}
        <span className="text-neutral-500 text-xs">{updatedAgo || "..."}</span>
        {action && (
          <div className={cn("p-2 rounded-full", severityColors.badgeBg)}>
            <span className={cn("text-white", severityColors.text)}>
              {action}
            </span>
          </div>
        )}
      </footer>
    </div>
  );
};

export default WazeCard;
