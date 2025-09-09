// AlertSubTypeInfo.ts
import { AlertSubType } from "@/types/wazeData";

export const AlertSubTypeInfo: Record<AlertSubType, { label: string }> = {
  // ACCIDENT
  [AlertSubType.ACCIDENT_MINOR]: { label: "Acidente menor" },
  [AlertSubType.ACCIDENT_MAJOR]: { label: "Acidente grave" },
  [AlertSubType.ACCIDENT_NO_SUBTYPE]: { label: "Sem subtipo" },

  // JAM
  [AlertSubType.JAM_MODERATE_TRAFFIC]: { label: "Tráfego moderado" },
  [AlertSubType.JAM_HEAVY_TRAFFIC]: { label: "Tráfego intenso" },
  [AlertSubType.JAM_STAND_STILL_TRAFFIC]: { label: "Parado / congestionado" },
  [AlertSubType.JAM_LIGHT_TRAFFIC]: { label: "Tráfego leve" },
  [AlertSubType.JAM_NO_SUBTYPE]: { label: "Sem subtipo" },

  // HAZARD / WEATHER
  [AlertSubType.HAZARD_ON_ROAD]: { label: "Perigo na estrada" },
  [AlertSubType.HAZARD_ON_SHOULDER]: { label: "Perigo no acostamento" },
  [AlertSubType.HAZARD_WEATHER]: { label: "Perigo climático" },
  [AlertSubType.HAZARD_ON_ROAD_OBJECT]: { label: "Objeto na estrada" },
  [AlertSubType.HAZARD_ON_ROAD_POT_HOLE]: { label: "Buraco na estrada" },
  [AlertSubType.HAZARD_ON_ROAD_ROAD_KILL]: { label: "Animal atropelado" },
  [AlertSubType.HAZARD_ON_SHOULDER_CAR_STOPPED]: {
    label: "Carro parado no acostamento",
  },
  [AlertSubType.HAZARD_ON_SHOULDER_ANIMALS]: {
    label: "Animais no acostamento",
  },
  [AlertSubType.HAZARD_ON_SHOULDER_MISSING_SIGN]: { label: "Placa faltando" },
  [AlertSubType.HAZARD_WEATHER_FOG]: { label: "Nevoeiro" },
  [AlertSubType.HAZARD_WEATHER_HAIL]: { label: "Granizo" },
  [AlertSubType.HAZARD_WEATHER_HEAVY_RAIN]: { label: "Chuva intensa" },
  [AlertSubType.HAZARD_WEATHER_HEAVY_SNOW]: { label: "Neve intensa" },
  [AlertSubType.HAZARD_WEATHER_FLOOD]: { label: "Inundação" },
  [AlertSubType.HAZARD_WEATHER_MONSOON]: { label: "Monção" },
  [AlertSubType.HAZARD_WEATHER_TORNADO]: { label: "Tornado" },
  [AlertSubType.HAZARD_WEATHER_HEAT_WAVE]: { label: "Onda de calor" },
  [AlertSubType.HAZARD_WEATHER_HURRICANE]: { label: "Furacão" },
  [AlertSubType.HAZARD_WEATHER_FREEZING_RAIN]: { label: "Chuva congelante" },
  [AlertSubType.HAZARD_ON_ROAD_LANE_CLOSED]: { label: "Faixa fechada" },
  [AlertSubType.HAZARD_ON_ROAD_OIL]: { label: "Óleo na estrada" },
  [AlertSubType.HAZARD_ON_ROAD_ICE]: { label: "Gelo na estrada" },
  [AlertSubType.HAZARD_ON_ROAD_CONSTRUCTION]: { label: "Obras na estrada" },
  [AlertSubType.HAZARD_ON_ROAD_CAR_STOPPED]: { label: "Carro parado" },
  [AlertSubType.HAZARD_ON_ROAD_TRAFFIC_LIGHT_FAULT]: {
    label: "Semáforo com problema",
  },
  [AlertSubType.HAZARD_NO_SUBTYPE]: { label: "Sem subtipo" },

  // MISC
  [AlertSubType.MISC_NO_SUBTYPE]: { label: "Sem subtipo" },

  // CONSTRUCTION
  [AlertSubType.CONSTRUCTION_NO_SUBTYPE]: { label: "Sem subtipo" },

  // ROAD_CLOSED
  [AlertSubType.ROAD_CLOSED_HAZARD]: { label: "Fechamento: perigo" },
  [AlertSubType.ROAD_CLOSED_CONSTRUCTION]: { label: "Fechamento: obra" },
  [AlertSubType.ROAD_CLOSED_EVENT]: { label: "Fechamento: evento" },
  [AlertSubType.ROAD_CLOSED_NO_SUBTYPE]: { label: "Sem subtipo" },
};
