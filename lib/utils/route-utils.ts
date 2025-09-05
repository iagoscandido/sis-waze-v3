import type { WazeRoute } from "@/lib/types/definitions";

export type Severity = "low" | "normal" | "high" | "critical";
export type Status = "low" | "normal" | "high" | "critical";

export function calcTrendPercentage(
  currentTravelTimeSeconds: number,
  historicTimeSeconds: number
) {
  if (historicTimeSeconds === 0) return 0;
  return (
    ((currentTravelTimeSeconds - historicTimeSeconds) / historicTimeSeconds) *
    100
  );
}

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

      case "perc_desc":
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

export function getPercentageLevel(percentage: number): Severity {
  if (percentage <= 30) return "low";
  if (percentage <= 80) return "normal";
  if (percentage <= 100) return "high";
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

export function getSeverityColors(sev: Severity): {
  border: string;
  text: string;
  badgeBg: string;
} {
  switch (sev) {
    case "low":
      return {
        border: "border-green-500",
        text: "text-green-400",
        badgeBg: "bg-green-500/20", // Fundo com opacidade
      };
    case "normal":
      return {
        border: "border-yellow-500",
        text: "text-yellow-400",
        badgeBg: "bg-yellow-500/20",
      };
    case "high":
      return {
        border: "border-red-500",
        text: "text-red-400",
        badgeBg: "bg-red-500/20",
      };
    case "critical":
      return {
        // Para crítico, usamos um vermelho mais intenso
        border: "border-purple-700",
        text: "text-purple-600",
        badgeBg: "bg-purple-700/20",
      };
  }
}
