import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { BaseCard } from "@/components/BaseCard";
import { StatBox } from "@/components/StatBox";
import { Badge } from "@/components/ui/badge";
import { getSeverityBg, getSeverityLevel } from "@/lib/utils/route-utils";

interface CardIrregularityProps {
  id: string;
  city: string;
  street: string;

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
  city,
  street,
  seconds,
  delaySeconds,
  startNode,
  endNode,
  regularSpeed,
  speed,
  jamLevel,
  length,
  updateDate,
  detectionDate,
  isUpdating = false,
  isNewData = false,
  severity = 0,
  id,
  causeType,
  lat,
  lon,
  fromLat,
  fromLon,
}: CardIrregularityProps) => {
  const speedPercentage = (speed / regularSpeed) * 100;

  const severityLevel = getSeverityLevel(speedPercentage);
  const bgClass = getSeverityBg(severityLevel);

  const isPositive = speedPercentage >= 0;

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
      headerAction={
        <Badge
          variant={"secondary"}
          className="bg-white/20 rounded-lg text-xs text-white text-opacity-70"
        >
          {isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
          {speedPercentage.toFixed(1)}%
        </Badge>
      }
    >
      <div className="col-span-full flex flex-col space-y-2 mb-2 text-white text-opacity-80 text-sm">
        <StatBox label="Id" value={id} />
        <StatBox label="Cidade" value={city} />
        <StatBox
          label="Comprimento"
          value={`${(length * 0.001).toFixed(3)} Km`}
        />
        <StatBox
          label="Velocidade Atual"
          value={`${speed} km/h`}
          label2="Velocidade Regular"
          value2={`${regularSpeed} km/h`}
        />
        <StatBox
          value2={`${(delaySeconds / 60).toFixed(0)}min`}
          label2="Atraso"
          value={`${(seconds / 60).toFixed(0)}min`}
          label="Tempo"
        />
        <StatBox
          label="Trafego"
          value={`${jamLevel}`}
          label2="Severidade"
          value2={severity}
        />

        {causeType && <StatBox label="Causa" value={causeType} />}

        {(startNode || endNode) && (
          <StatBox
            label="Ponto inicial"
            value={startNode || "não informado"}
            label2="Ponto final"
            value2={endNode || "não informado"}
          />
        )}

        <StatBox
          label="ultima detecção"
          value={detectionDate}
          label2="ultima atualização"
          value2={updateDate}
        />
      </div>
    </BaseCard>
  );
};

export default CardIrregularity;
