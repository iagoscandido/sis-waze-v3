"use client";

import { cn } from "@/lib/utils";

interface StatBoxProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

export const StatBox = ({ label, value, highlight = false }: StatBoxProps) => {
  return (
    <div className="text-center p-3 bg-white/20 rounded-lg">
      <div className="text-xs text-white text-opacity-70 mb-1">{label}</div>
      <div
        className={cn(
          "text-lg font-bold text-white transition-colors duration-300",
          {
            "animate-pulse": highlight,
          }
        )}
      >
        {value}
      </div>
    </div>
  );
};
