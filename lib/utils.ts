import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  });
}

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

export function calcTrendPercentageSafe(
  currentTravelTimeSeconds: number,
  historicTimeSeconds: number
) {
  const safeHistoricTime = historicTimeSeconds > 0 ? historicTimeSeconds : 1;
  const safeCurrentTime =
    currentTravelTimeSeconds > 0 ? currentTravelTimeSeconds : safeHistoricTime;
  return ((safeCurrentTime - safeHistoricTime) / safeHistoricTime) * 100;
}

type Status = "low" | "normal" | "high" | "critical";

export function getRouteStatus(
  current: number,
  average: number,
  tolerance: number
): Status {
  if (current <= average - tolerance) return "low";
  if (current >= average + tolerance) return "high";
  return "normal";
}

export function getSeverityLevel(trend: number): Status {
  if (trend <= 30) return "low";
  if (trend <= 80) return "normal";
  if (trend <= 100) return "high";
  return "critical";
}

export function getSeverityBg(severity: Status): string {
  return {
    low: "bg-green-900",
    normal: "bg-yellow-900",
    high: "bg-red-900",
    critical: "bg-purple-900",
  }[severity];
}
