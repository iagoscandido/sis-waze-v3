import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface AnomalyCardProps {
  children?: React.ReactNode;
  route: string;
  averageTravelTime: number;
  currentTravelTime: number;
  jamLevel?: number;
  tolerance?: number;
  isUpdating?: boolean; // New prop for real-time updates
}

type Status = "normal" | "above_average" | "below_average";

export const AnomalyCard = ({
  route,
  averageTravelTime,
  currentTravelTime,
  jamLevel,
  tolerance = Math.max(currentTravelTime * 0.1, 2), // Minimum 2 min tolerance
  isUpdating = false,
}: AnomalyCardProps) => {
  const [isNewData, setIsNewData] = useState(false);
  const [previousTime, setPreviousTime] = useState(currentTravelTime);

  // Detect data changes for visual feedback
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

  const jamLevels: Record<
    number,
    { label: string; variant: JamVariant; color: string; intensity: string }
  > = {
    0: {
      label: "Livre",
      variant: "jam0",
      color: "bg-green-500",
      intensity: "🟢",
    },
    1: {
      label: "Trânsito leve",
      variant: "jam1",
      color: "bg-yellow-400",
      intensity: "🟡",
    },
    2: {
      label: "Moderado",
      variant: "jam2",
      color: "bg-orange-500",
      intensity: "🟠",
    },
    3: {
      label: "Intenso",
      variant: "jam3",
      color: "bg-red-500",
      intensity: "🔴",
    },
    4: {
      label: "Muito intenso",
      variant: "jam4",
      color: "bg-black",
      intensity: "🔴🔴",
    },
  };

  // Calculate trend percentage
  const trendPercentage =
    averageTravelTime > 0
      ? Math.round(
          ((currentTravelTime - averageTravelTime) / averageTravelTime) * 100
        )
      : 0;

  const trendIconClasses = cn(
    "w-5 h-5 transition-all duration-500",
    status === "above_average" && "text-destructive animate-pulse",
    status === "below_average" && "text-green-600",
    status === "normal" && "text-muted-foreground"
  );

  // const TrendIcon = () => {
  //   if (status === "above_average") {
  //     return (
  //       <svg
  //         className={trendIconClasses}
  //         fill="currentColor"
  //         viewBox="0 0 24 24"
  //         title={`${trendPercentage}% acima da média`}
  //       >
  //         <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
  //       </svg>
  //     );
  //   } else if (status === "below_average") {
  //     return (
  //       <svg
  //         className={trendIconClasses}
  //         fill="currentColor"
  //         viewBox="0 0 24 24"
  //         title={`${Math.abs(trendPercentage)}% abaixo da média`}
  //       >
  //         <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z" />
  //       </svg>
  //     );
  //   }
  //   return (
  //     <svg
  //       className={trendIconClasses}
  //       fill="currentColor"
  //       viewBox="0 0 24 24"
  //       title="Dentro da normalidade"
  //     >
  //       <path d="M22 12l-4-4v3H3v2h15v3z" />
  //     </svg>
  //   );
  // };

  // Get severity level for additional styling

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
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-lg",
        "border-2 transform hover:scale-[1.02]",
        {
          // Status-based styling using shadcn/ui patterns
          "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800":
            status === "below_average",
          "bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20":
            status === "above_average" && severity === "critical",
          "bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800":
            status === "above_average" && severity === "warning",
          "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800":
            status === "above_average" && severity === "mild",
          "bg-gradient-to-br from-muted/50 to-muted border-border":
            status === "normal",

          // Real-time update effects
          "ring-4 ring-primary/30": isUpdating,
          "ring-4 ring-green-300 dark:ring-green-600 ring-opacity-75 animate-pulse":
            isNewData,
        }
      )}
    >
      {/* Update indicator */}
      {isUpdating && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full animate-pulse" />
      )}

      {/* New data flash effect */}
      {isNewData && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent opacity-20 animate-ping" />
      )}

      <div className="p-4">
        <CardTitle className="flex items-center justify-between gap-2 text-lg font-bold mb-2">
          <span className="truncate flex-1" title={route}>
            {route}
          </span>
          <div className="flex items-center gap-1">
            {/* <TrendIcon /> */}
            {trendPercentage !== 0 && (
              <Badge
                variant={
                  status === "above_average" ? "destructive" : "secondary"
                }
                className="text-xs px-1 py-0.5"
              >
                {trendPercentage > 0 ? "+" : ""}
                {trendPercentage}%
              </Badge>
            )}
          </div>
        </CardTitle>

        <CardDescription className="flex items-center justify-between gap-2 mb-3">
          <span className="text-sm font-medium">{statusLabel[status]}</span>
          {jamLevel !== undefined && jamLevels[jamLevel] && (
            <div className="flex items-center gap-1">
              <span className="text-sm">{jamLevels[jamLevel].intensity}</span>
              <Badge variant={jamLevels[jamLevel].variant} className="text-xs">
                {jamLevels[jamLevel].label}
              </Badge>
            </div>
          )}
        </CardDescription>

        <CardContent className="p-0">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 bg-muted/50 rounded-lg border">
              <div className="text-xs text-muted-foreground mb-1">Média</div>
              <div className="text-lg font-bold text-foreground">
                {averageTravelTime}
                <span className="text-xs ml-1">min</span>
              </div>
            </div>

            <div className="text-center p-3 bg-muted/50 rounded-lg border">
              <div className="text-xs text-muted-foreground mb-1">Atual</div>
              <div
                className={cn(
                  "text-lg font-bold transition-colors duration-300",
                  {
                    "text-destructive": status === "above_average",
                    "text-green-600 dark:text-green-400":
                      status === "below_average",
                    "text-foreground": status === "normal",
                    "animate-pulse": isNewData,
                  }
                )}
              >
                {currentTravelTime}
                <span className="text-xs ml-1">min</span>
              </div>
            </div>
          </div>

          {/* Traffic intensity bar */}
          {jamLevel !== undefined && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Intensidade do tráfego</span>
                <span>{jamLevel}/4</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className={cn(
                    "h-2 rounded-full transition-all duration-500",
                    jamLevels[jamLevel]?.color || "bg-muted-foreground"
                  )}
                  style={{ width: `${((jamLevel || 0) / 4) * 100}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </div>

      {/* Bottom accent line based on severity */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1 transition-all duration-300",
          {
            "bg-gradient-to-r from-green-400 to-green-600":
              status === "below_average",
            "bg-gradient-to-r from-destructive to-destructive/80":
              severity === "critical",
            "bg-gradient-to-r from-orange-400 to-orange-600":
              severity === "warning",
            "bg-gradient-to-r from-yellow-400 to-yellow-600":
              severity === "mild",
            "bg-gradient-to-r from-muted-foreground/30 to-muted-foreground/50":
              status === "normal",
          }
        )}
      />
    </Card>
  );
};
