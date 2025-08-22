import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface RouteCardProps {
  children?: React.ReactNode;
  route: string;
  averageTravelTime: number;
  currentTravelTime: number;
  jamLevel?: number;
  tolerance?: number;
  isUpdating?: boolean;
}

type Status = "normal" | "above_average" | "below_average";

export const RouteCard = ({
  route,
  averageTravelTime,
  currentTravelTime,
  jamLevel,
  tolerance = currentTravelTime * 0.3,
  isUpdating = false,
}: RouteCardProps) => {
  const [isNewData, setIsNewData] = useState(false);
  const [previousTime, setPreviousTime] = useState(currentTravelTime);

  useEffect(() => {
    if (previousTime !== currentTravelTime && previousTime !== 0) {
      setIsNewData(true);
      const timer = setTimeout(() => setIsNewData(false), 2000); // Flash for 2 seconds
      return () => clearTimeout(timer);
    }
    setPreviousTime(currentTravelTime);
  }, [currentTravelTime, previousTime]);

  let status: Status = "normal";

  if (currentTravelTime <= averageTravelTime - tolerance) {
    status = "below_average";
  } else if (currentTravelTime >= averageTravelTime + tolerance) {
    status = "above_average";
  }

  const statusLabel: Record<Status, string> = {
    normal: "Dentro da média",
    above_average: "Acima da média",
    below_average: "Abaixo da média",
  };

  type JamVariant = "jam0" | "jam1" | "jam2" | "jam3" | "jam4";

  const jamLevels: Record<number, { label: string; variant: JamVariant }> = {
    0: {
      label: "Livre",
      variant: "jam0",
    },
    1: {
      label: "Trânsito leve",
      variant: "jam1",
    },
    2: {
      label: "Moderado",
      variant: "jam2",
    },
    3: {
      label: "Intenso",
      variant: "jam3",
    },
    4: {
      label: "Muito intenso",
      variant: "jam4",
    },
  };

  const trendPercentage =
    averageTravelTime > 0
      ? Math.round(
          ((currentTravelTime - averageTravelTime) / averageTravelTime) * 100
        )
      : 0;

  const getSeverityLevel = () => {
    if (status === "normal") return "normal";

    const percentageChange = Math.abs(trendPercentage);
    if (percentageChange >= 50) return "critical";
    if (percentageChange >= 25) return "warning";
    return "mild";
  };

  const severity = getSeverityLevel();

  return (
    <Card
      className={cn("h-full w-full", "transition-all duration-300", {
        "ring-4 ring-primary/30": isUpdating,
        "ring-4 ring-green-300 dark:ring-green-600 ring-opacity-75 animate-pulse":
          isNewData,
        "bg-green-700": status === "below_average",
        "bg-red-700": status === "above_average" && severity === "critical",
        "bg-yellow-700": status === "above_average" && severity === "warning",
        "bg-orange-700": status === "above_average" && severity === "mild",
        "bg-gray-700": status === "normal",
      })}
    >
      <CardHeader className="items-center justify-between">
        <CardTitle key={route} className="font-medium text-white max-h-12">
          {route}
        </CardTitle>
        <CardAction>
          {trendPercentage !== 0 && (
            <Badge variant="secondary" className="text-xs px-1 py-0.5">
              {trendPercentage > 0 ? "+" : ""}
              {trendPercentage}%
            </Badge>
          )}
        </CardAction>
      </CardHeader>

      <CardDescription className="flex items-center justify-between gap-2 mb-3 px-6 text-white text-opacity-80">
        <span className="text-sm font-medium">{statusLabel[status]}</span>
        {jamLevel !== undefined && jamLevels[jamLevel] && (
          <div className="flex items-center gap-1">
            Congestionamento:
            <Badge variant={jamLevels[jamLevel].variant}>
              {jamLevels[jamLevel].label}
            </Badge>
          </div>
        )}
      </CardDescription>

      <CardContent className="p-0">
        <div className="grid grid-cols-2 gap-2 text-sm p-2">
          <div className="text-center p-3 bg-white/20 rounded-lg">
            <div className="text-xs text-white text-opacity-70 mb-1">Média</div>
            <div className="text-lg font-bold text-white">
              {averageTravelTime}
              <span className="text-xs ml-1">min</span>
            </div>
          </div>

          <div className="text-center p-3 bg-white/20 rounded-lg">
            <div className="text-xs text-white text-opacity-70 mb-1">Atual</div>
            <div
              className={cn(
                "text-lg font-bold transition-colors duration-300 text-white",
                {
                  "animate-pulse": isNewData,
                }
              )}
            >
              {currentTravelTime}
              <span className="text-xs ml-1">min</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
