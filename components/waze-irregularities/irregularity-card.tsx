import { BaseCard } from "@/components/BaseCard";
import { getPercentageLevel, getSeverityBg } from "@/lib/utils/route-utils";
import { Separator } from "../ui/separator";

interface CardIrregularityProps {
  id: string;

  street: string;
  city: string;

  seconds: number;
  delaySeconds: number;

  startNode?: string;
  endNode?: string;

  regularSpeed: number;
  speed: number;

  jamLevel: number;
  length: number;

  updateDate?: string;
  detectionDate?: string;

  isUpdating?: boolean;
  isNewData?: boolean;

  severity: number;

  causeType?: string;
  trendPercentage?: number;

  trend?: string;

  lat: number;
  lon: number;
  fromLat: number;
  fromLon: number;
}

export const trendIndicator: Record<number, string> = {
  0: "Tendencia a piorar",
  1: "Tendencia a melhorar",
};

const CardIrregularity = ({
  street,
  seconds,
  delaySeconds,
  startNode,
  endNode,
  regularSpeed,
  speed,
  jamLevel,
  length,

  isUpdating = false,
  isNewData = false,
  severity = 0,
  trend,

  // causeType,
  lat,
  lon,
  fromLat,
  fromLon,
}: CardIrregularityProps) => {
  const currentTime = delaySeconds + seconds;

  const trendPercentage = ((currentTime - seconds) / seconds) * 100;

  const severityLevel = getPercentageLevel(trendPercentage);
  const bgClass = getSeverityBg(severityLevel);

  return (
    <BaseCard
      title={street}
      isUpdating={isUpdating}
      isNewData={isNewData}
      className={bgClass}
      fromLat={fromLat}
      fromLon={fromLon}
      lon={lon}
      lat={lat}
      showButtons={true}
      trendingPercentage={trendPercentage}
      description={""}
    >
      <div className="flex flex-wrap gap-1 text-white text-opacity-80 text-md text-pretty">
        <p>Tendencia: {}</p>
        <p>Velocidade Atual x Histórica:</p>
        <p>
          {`${speed} km/h`} x{`${regularSpeed} km/h`}
        </p>
        <Separator />
        <p>Comprimento: {`${(length * 0.001).toFixed(3)} Km`}</p>
        <Separator />
        <p>
          Tempo Atual: {`${((delaySeconds + seconds) / 60).toFixed(0)}min`}{" "}
          Tempo Médio: {`${(seconds / 60).toFixed(0)}min`}
        </p>
        <Separator />
        <p>
          Trafego: {`${jamLevel}`} / Severidade: {severity}
        </p>
        <Separator />
        {startNode && <span>Ponto inicial: {startNode}</span>}
        {endNode && <span>Ponto inicial: {endNode}</span>}
      </div>
    </BaseCard>
  );
};

export default CardIrregularity;
