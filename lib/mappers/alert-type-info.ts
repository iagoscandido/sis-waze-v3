// AlertTypeInfo.ts
import { AlertType } from "@/types/wazeData";

export const AlertTypeInfo: Record<
  AlertType,
  { label: string; icon: string; color: string }
> = {
  [AlertType.ACCIDENT]: {
    label: "Acidente",
    icon: "CarCrashIcon",
    color: "bg-red-500",
  },
  [AlertType.JAM]: {
    label: "Congestionamento",
    icon: "TrafficJamIcon",
    color: "bg-yellow-500",
  },
  [AlertType.WEATHERHAZARD]: {
    label: "Perigo climático",
    icon: "CloudLightningIcon",
    color: "bg-blue-500",
  },
  [AlertType.MISC]: {
    label: "Outros",
    icon: "AlertTriangleIcon",
    color: "bg-gray-500",
  },
  [AlertType.CONSTRUCTION]: {
    label: "Obras",
    icon: "WrenchIcon",
    color: "bg-orange-500",
  },
  [AlertType.ROAD_CLOSED]: {
    label: "Rua fechada",
    icon: "BanIcon",
    color: "bg-black",
  },
  [AlertType.HAZARD]: {
    label: "Perigo",
    icon: "AlertOctagonIcon",
    color: "bg-purple-500",
  },
};
