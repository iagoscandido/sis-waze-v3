"use client";

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import type { ReactNode } from "react";
import { MapButton } from "@/components/map-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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
  fromLat: number;
  fromLon: number;
  description?: string;
  trendingPercentage?: number;
}

export const BaseCard = ({
  title,
  children,
  isUpdating = false,
  isNewData = false,
  className,
  showButtons = false,
  lat,
  lon,
  fromLat,
  fromLon,
  description,
  trendingPercentage = 0,
}: BaseCardProps) => {
  return (
    <Card
      className={cn(
        "h-full w-full transition-all duration-300 rounded-sm",
        {
          "ring-4 ring-primary/30": isUpdating,
          "ring-4 ring-green-300 dark:ring-green-600 ring-opacity-75 animate-pulse":
            isNewData,
        },
        className,
      )}
    >
      {/* Header */}
      <CardHeader className="flex flex-wrap items-center justify-between">
        <CardTitle className="font-medium text-white text-wrap">
          {title || "Não informado"}
          {description && <CardDescription>{description}</CardDescription>}
        </CardTitle>

        <CardAction>
          {showButtons && (
            <MapButton
              toLat={lat}
              toLon={lon}
              fromLat={fromLat}
              fromLon={fromLon}
            />
          )}
        </CardAction>
        <CardAction>
          <Badge
            variant={"secondary"}
            className="bg-white/20 rounded-lg text-xs text-white text-opacity-70"
          >
            {trendingPercentage > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
            {trendingPercentage.toFixed(1)}%
          </Badge>
        </CardAction>
      </CardHeader>
      <Separator />

      <CardContent>
        <div className="flex text-md p-2">{children}</div>
      </CardContent>
    </Card>
  );
};
