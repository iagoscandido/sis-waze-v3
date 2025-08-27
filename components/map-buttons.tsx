import { MapIcon } from "lucide-react";
import Link from "next/link";

export interface MapButtonsProps {
  lat: number;
  lon: number;
  fromLat: number;
  fromLon: number;
  navigate?: boolean;
  zoom?: number;
}

const mapButtons = ({
  lat,
  lon,
  navigate = true,
  zoom = 17,
  fromLat,
  fromLon,
}: MapButtonsProps) => {
  const wazeURL = `https://www.waze.com/pt-BR/live-map/directions?navigate=${navigate}&zoom=${zoom}&ll=${lat}%2C${lon}&from=ll%7D&to=${lat}%2C${lon}&from=${fromLat}%2C${fromLon}`;

  return (
    <div className="flex items-center w-full gap-x-2">
      <div className="flex-1">
        <Link target="_blank" rel="noopener noreferrer" href={wazeURL}>
          <MapIcon />
        </Link>
      </div>
    </div>
  );
};

export default mapButtons;
