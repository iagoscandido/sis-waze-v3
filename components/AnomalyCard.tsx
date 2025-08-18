// components/AnomalyCard.tsx
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
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

  const cardClass = clsx("p-4 rounded-2xl shadow-md transition-colors", {
    "bg-green-100 text-green-700": status === "below_average",
    "bg-red-100 text-red-700": status === "above_average",
    "bg-gray-100 text-gray-800": status === "normal",
  });

  const statusLabel: Record<Status, string> = {
    normal: "Dentro da média",
    above_average: "Acima da média",
    below_average: "Abaixo da média",
  };

  const jamLevels: Record<number, { label: string; color: string }> = {
    0: { label: "Livre", color: "bg-green-500" },
    1: { label: "Trânsito leve", color: "bg-yellow-400" },
    2: { label: "Moderado", color: "bg-orange-500" },
    3: { label: "Intenso", color: "bg-red-500" },
    4: { label: "Muito intenso", color: "bg-black" },
  };

  return (
    <Card className={cardClass}>
      <CardTitle className="text-lg font-semibold">{route}</CardTitle>
      <CardDescription className="flex items-center gap-2">
        Status: {statusLabel[status]}
        {jamLevel !== undefined && (
          <span
            className={clsx(
              "px-2 py-0.5 text-xs font-medium text-white rounded-full",
              jamLevels[jamLevel]?.color
            )}
          >
            {jamLevels[jamLevel]?.label ?? "Desconhecido"}
          </span>
        )}
      </CardDescription>
      <CardContent className="mt-2 space-y-2">
        <p>
          <span className="font-medium">Média:</span> {averageTravelTime} min
        </p>
        <p>
          <span className="font-medium">Atual:</span> {currentTravelTime} min
        </p>
        {children}
      </CardContent>
    </Card>
  );
};
