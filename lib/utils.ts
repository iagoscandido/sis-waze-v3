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
  const trend =
    (currentTravelTimeSeconds - historicTimeSeconds) / historicTimeSeconds;
  return Math.round(trend * 100);
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
