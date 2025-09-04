import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getTrendingPercentage } from "@/lib/utils/math";
import { getPercentageLevel, getSeverityBg } from "@/lib/utils/route-utils";

interface CardTestProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  delay: number;
  seconds: number;
  isNewData?: boolean;
  isUpdating?: boolean;
  action?: ReactNode;
}

export const CardTest = async ({
  title,
  description,
  children,

  delay,
  seconds,
  action,
  isNewData = false,
  isUpdating = false,
}: CardTestProps) => {
  const trendingPercentage = getTrendingPercentage(delay, seconds);
  const severityLevel = getPercentageLevel(trendingPercentage);
  const bgClass = getSeverityBg(severityLevel);

  return (
    <Card
      className={cn(
        `w-full max-w-sm transition duration-300 hover:scale-105 ${bgClass}`,
        {
          "ring-4 ring-primary/30": isUpdating,
          "ring-4 ring-green-300 dark:ring-green-600 ring-opacity-75 animate-pulse":
            isNewData,
        },
      )}
    >
      {/* Header */}
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-medium text-white">
          {title || "Não informado"}
          {description && <CardDescription>{description}</CardDescription>}
        </CardTitle>

        {action && <CardAction>{action}</CardAction>}
        <CardAction>
          <Badge
            variant={"secondary"}
            className="bg-white/20 rounded-lg text-xs text-white text-opacity-70"
          >
            {trendingPercentage < 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
            {trendingPercentage.toFixed(2)}%
          </Badge>
        </CardAction>
      </CardHeader>
      <Separator />

      <CardContent>
        <div>{children}</div>
      </CardContent>
    </Card>
  );
};
