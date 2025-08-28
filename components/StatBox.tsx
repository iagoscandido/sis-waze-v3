"use client";

import { cn } from "@/lib/utils";

interface StatBoxProps {
  label: string;
  value: string | number;
  label2?: string;
  value2?: string | number;
  highlight?: boolean;
}

export const StatBox = ({
  label,
  value,
  label2,
  value2,
  highlight = false,
}: StatBoxProps) => {
  return (
    <div className="text-card-foreground p-3 bg-white/20 rounded-lg space-y-1">
      {/* Primeiro par */}
      <div className="flex justify-between text-sm text-white text-opacity-70">
        <span>{label}</span>
        <span
          className={cn("text-card-foreground transition-colors duration-300", {
            "animate-pulse": highlight,
          })}
        >
          {value}
        </span>
      </div>

      {/* Segundo par, se houver */}
      {label2 && value2 !== undefined && (
        <div className="flex justify-between text-sm text-white text-opacity-70">
          <span>{label2}</span>
          <span
            className={cn(
              "text-card-foreground transition-colors duration-300",
              {
                "animate-pulse": highlight,
              },
            )}
          >
            {value2}
          </span>
        </div>
      )}
    </div>
  );
};
