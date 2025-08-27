import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

{
  /* <iframe src="https://embed.waze.com/pt-BR/iframe?zoom=12&lat=&{}&lon=${}&pin=1&desc=1"
  width="${}" height="${}"></iframe> */
}

interface MapModalButtonProps {
  lat: number;
  lon: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MapModalButton: React.FC<MapModalButtonProps> = ({
  lat,
  lon,
  open,
  onOpenChange,
}) => {
  const mapSrc = `https://embed.waze.com/pt-BR/iframe?zoom=15&lat=${lat}&lon=${lon}&pin=1&desc=1`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-5xl">
        <DialogHeader>
          <DialogTitle>Mapa da Rota</DialogTitle>
          <DialogDescription>
            Visualize a localização diretamente no Waze.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full aspect-video rounded-lg overflow-hidden">
          <iframe
            src={mapSrc}
            className="w-full h-full border-0"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapModalButton;
