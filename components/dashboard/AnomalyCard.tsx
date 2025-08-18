import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

interface AnomalyCardProps {
  children?: React.ReactNode;
  route: string;
  averageTravelTime: number;
  currentTravelTime: number;
  jamLevel?: number;
  tolerance?: number;
}

type Status = "normal" | "above_average" | "below_average";

export const AnomalyCard = ({
  children,
  route,
  averageTravelTime,
  currentTravelTime,
  jamLevel,
  tolerance = currentTravelTime * 0.1,
}: AnomalyCardProps) => {
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
    0: { label: "Livre", variant: "jam0" },
    1: { label: "Trânsito leve", variant: "jam1" },
    2: { label: "Moderado", variant: "jam2" },
    3: { label: "Intenso", variant: "jam3" },
    4: { label: "Muito intenso", variant: "jam4" },
  };

  const trendIconClasses = clsx(
    "w-5 h-5 ",
    "transition-colors duration-500",
    status === "above_average" && "text-red-600 ",
    status === "below_average" && "text-green-600 ",
    status === "normal" && "text-gray-500"
  );

  const TrendIcon = () => {
    if (status === "above_average") {
      return (
        <svg
          className={trendIconClasses}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 17l6-6 4 4 8-8v10H3z" />
        </svg>
      );
    } else if (status === "below_average") {
      return (
        <svg
          className={trendIconClasses}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 7l-6 6-4-4-8 8V7h18z" />
        </svg>
      );
    }
    return null;
  };

  return (
    <Card
      className={clsx("p-4 rounded-2xl shadow-md transition-colors", {
        "bg-green-100 text-green-700": status === "below_average",
        "bg-red-100 text-red-700": status === "above_average",
        "bg-gray-100 text-gray-800": status === "normal",
      })}
    >
      <CardTitle className="flex items-center gap-2 text-md font-semibold">
        {route}
        <TrendIcon />
      </CardTitle>
      <CardDescription className="flex items-center gap-2">
        Status: {statusLabel[status]}
        {jamLevel !== undefined && (
          <Badge variant={jamLevels[jamLevel]?.variant}>
            {jamLevels[jamLevel]?.label ?? "Desconhecido"}
          </Badge>
        )}
      </CardDescription>
      <CardContent className="mt-2 space-x-2">
        <p>
          <span className="text-sm">Média:</span> {averageTravelTime} min{" "}
          <span className="font-medium">Atual:</span> {currentTravelTime} min
        </p>
      </CardContent>
    </Card>
  );
};
