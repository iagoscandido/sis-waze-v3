import { WazeRoute } from "@/lib/definitions";

export type Severity = "low" | "normal" | "high" | "critical";
export type Status = "low" | "normal" | "high" | "critical";

export const statusLabel: Record<Status, string> = {
  low: "Abaixo da média",
  normal: "Dentro da média",
  high: "Acima da média",
  critical: "Muito acima da média",
};

export const jamLevels: Record<number, string> = {
  0: "Sem Trânsito",
  1: "Trânsito leve",
  2: "Trânsito Moderado",
  3: "Trânsito Intenso",
  4: "Trânsito Muito intenso",
};

export function mapRoutes(routes: WazeRoute[]) {
  return routes.map((route) => {
    return { ...route };
  });
}

export function sortRoutes(routes: WazeRoute[], value: string) {
  return [...routes].sort((a, b) => {
    switch (value) {
      case "name_asc":
        return a.name.localeCompare(b.name);

      case "time_desc": {
        const aCurr = a.time > 0 ? a.time : a.historicTime;
        const bCurr = b.time > 0 ? b.time : b.historicTime;
        return bCurr - aCurr;
      }

      case "trend_desc":
      default:
        return (b.trendPercentage ?? 0) - (a.trendPercentage ?? 0);
    }
  });
}

export function getRouteStatus(
  current: number,
  average: number,
  tolerance?: number
): Status {
  const tol = tolerance ?? current * 0.3;
  if (current <= average - tol) return "low";
  if (current >= average + tol) return "high";
  return "normal";
}

export function getSeverityLevel(trendPercentage: number): Severity {
  if (trendPercentage <= 30) return "low";
  if (trendPercentage <= 80) return "normal";
  if (trendPercentage <= 100) return "high";
  return "critical";
}

export function getSeverityBg(sev: Severity): string {
  return {
    low: "bg-green-900",
    normal: "bg-yellow-900",
    high: "bg-red-900",
    critical: "bg-purple-900",
  }[sev];
}
