import { MapIcon } from "lucide-react";
import Link from "next/link";

export interface MapButton {
  toLat: number;
  toLon: number;
  fromLat: number;
  fromLon: number;
  navigate?: boolean;
  zoom?: number;
}

export const MapButton = ({
  toLat,
  toLon,
  navigate = true,
  zoom = 17,
  fromLat,
  fromLon,
}: MapButton) => {
  const wazeUrl = `https://www.waze.com/pt-BR/live-map/directions?navigate=${navigate}&zoom=${zoom}&ll=${toLat}%2C${toLon}&from=ll.${fromLat}%2C${fromLon}`;

  return (
    <div>
      <Link target="_blank" rel="noopener noreferrer" href={wazeUrl}>
        <MapIcon />
      </Link>
    </div>
  );
};
