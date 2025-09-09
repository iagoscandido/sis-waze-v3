import {
  MoveDownIcon,
  MoveRightIcon,
  MoveUpIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";

//SeverityLevel: Gravidade calculada da irregularidade de 0 a 5 (5 = mais grave)
//JamLevel:  1 a 4, sendo 4 o pior nível de congestionamento
//Trend: -1 melhorando, 0 constante, 1 piorando

export type Status = "low" | "normal" | "high" | "critical";

export type JamLevel = 1 | 2 | 3 | 4;
export function getJamDescription(level: JamLevel): string {
  return (
    {
      1: "Trânsito leve",
      2: "Trânsito moderado",
      3: "Trânsito intenso",
      4: "Trânsito muito intenso",
    }[level] ?? "Nível de congestionamento desconhecido"
  );
}

export type SeverityLevel = 0 | 1 | 2 | 3 | 4 | 5;
export function getSeverityDescription(level: SeverityLevel): string {
  return (
    {
      0: "Sem trânsito",
      1: "Trânsito livre",
      2: "Trânsito leve",
      3: "Trânsito moderado",
      4: "Trânsito intenso",
      5: "Parado / Congestionado",
    }[level] ?? "Nível de trânsito desconhecido"
  );
}

export function getSeverityVisuals(SeverityLevel: SeverityLevel): {
  status: Status;
  label: string;
  bgColor: string;
} {
  switch (true) {
    case SeverityLevel <= 1:
      return {
        status: "low",
        label: getSeverityDescription(SeverityLevel),
        bgColor: "bg-green-900",
      };
    case SeverityLevel <= 2:
      return {
        status: "normal",
        label: getSeverityDescription(SeverityLevel),
        bgColor: "bg-yellow-900",
      };
    case SeverityLevel <= 4:
      return {
        status: "high",
        label: getSeverityDescription(SeverityLevel),
        bgColor: "bg-red-900",
      };
    default:
      return {
        status: "critical",
        label: getSeverityDescription(SeverityLevel),
        bgColor: "bg-purple-900",
      };
  }
}

export type TrendLevel = -1 | 0 | 1;
export function getTrendVisuals(trend: TrendLevel): {
  bgColor: string;
  icon: React.ElementType;
} {
  switch (trend) {
    case -1:
      return { bgColor: "bg-green-500", icon: MoveUpIcon };
    case 0:
      return { bgColor: "bg-yellow-500", icon: MoveRightIcon };
    case 1:
      return { bgColor: "bg-red-500", icon: MoveDownIcon };
  }
}

export function getTimePercentage(
  currentTimeSeconds: number,
  historicTimeSeconds: number
) {
  if (historicTimeSeconds === 0) return 0;
  return (
    ((currentTimeSeconds - historicTimeSeconds) / historicTimeSeconds) * 100
  );
}

export function getPercentageVisuals(
  currentTimeSeconds: number,
  historicTimeSeconds: number
): {
  status: Status;
  label: string;
  bgColor: string;
  badgeBg: string;
  percentage: number;
  icon: React.ElementType;
} {
  const percentage = getTimePercentage(currentTimeSeconds, historicTimeSeconds);

  const icon = percentage >= 0 ? TrendingUpIcon : TrendingDownIcon;

  switch (true) {
    case percentage <= 30:
      return {
        status: "low",
        label: "Abaixo da média",
        bgColor: "bg-green-900",
        badgeBg: "bg-green-500/20",
        percentage,
        icon,
      };
    case percentage <= 80:
      return {
        status: "normal",
        label: "Dentro da média",
        bgColor: "bg-yellow-900",
        badgeBg: "bg-yellow-500/20",
        percentage,
        icon,
      };
    case percentage <= 100:
      return {
        status: "high",
        label: "Acima da média",
        bgColor: "bg-red-900",
        badgeBg: "bg-red-500/20",
        percentage,
        icon,
      };
    default:
      return {
        status: "critical",
        label: "Muito acima da média",
        bgColor: "bg-purple-900",
        badgeBg: "bg-purple-700/20",
        percentage,
        icon,
      };
  }
}
