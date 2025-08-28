"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import MapButtons from "@/components/map-buttons";

interface BaseCardProps {
  title: string;
  children: ReactNode;
  isUpdating?: boolean;
  isNewData?: boolean;
  className?: string;
  headerAction?: ReactNode;
  showButtons?: boolean;
  lat: number;
  lon: number;
  zoom?: number;
  navigate?: boolean;
  fromLat: number;
  fromLon: number;
}

export const BaseCard = ({
  title,
  children,
  isUpdating = false,
  isNewData = false,
  className,
  headerAction,
  showButtons = false,
  lat,
  lon,
  zoom,
  navigate,
  fromLat,
  fromLon,
}: BaseCardProps) => {
  return (
    <Card
      className={cn(
        "h-full w-full transition-all duration-300",
        {
          "ring-4 ring-primary/30": isUpdating,
          "ring-4 ring-green-300 dark:ring-green-600 ring-opacity-75 animate-pulse":
            isNewData,
        },
        className,
      )}
    >
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-medium text-white max-h-12">
          {title}
        </CardTitle>
        {headerAction && <div>{headerAction}</div>}
      </CardHeader>
      <Separator />

      {/* Conteúdo genérico (stat boxes, badges, etc.) */}
      <CardContent className="p-0">
        <div className="grid grid-cols-2 gap-2 text-sm p-2">{children}</div>
      </CardContent>
      <Separator />
      {showButtons && (
        <CardFooter>
          <MapButtons
            lat={lat}
            lon={lon}
            zoom={zoom}
            navigate={navigate}
            fromLat={fromLat}
            fromLon={fromLon}
          />
        </CardFooter>
      )}
    </Card>
  );
};
