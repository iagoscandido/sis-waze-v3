import { BaseCard } from "@/components/BaseCard";
import { getSeverityBg, getSeverityLevel } from "@/lib/utils/route-utils";
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

  updateDate: string;
  detectionDate: string;

  isUpdating?: boolean;
  isNewData?: boolean;

  severity: number;

  causeType?: string;
  trendPercentage?: number;

  lat: number;
  lon: number;
  fromLat: number;
  fromLon: number;
}

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

  causeType,
  lat,
  lon,
  fromLat,
  fromLon,
}: CardIrregularityProps) => {
  const speedPercentage = (speed / regularSpeed) * 100;

  const severityLevel = getSeverityLevel(speedPercentage);
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
      trendingPercentage={speedPercentage}
      description={causeType}
    >
      <div className="flex flex-wrap gap-1 text-white text-opacity-80 text-md text-pretty">
        <p>Velocidade Atual x Histórica:</p>
        <p>
          {`${speed} km/h`} x{`${regularSpeed} km/h`}
        </p>
        <Separator />
        <p>Comprimento: {`${(length * 0.001).toFixed(3)} Km`}</p>
        <Separator />
        <p>Atraso: {`${(delaySeconds / 60).toFixed(0)}min`}</p>
        <Separator />
        <p>Tempo: {`${(seconds / 60).toFixed(0)}min`}</p>
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
