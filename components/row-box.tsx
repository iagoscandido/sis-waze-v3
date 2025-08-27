"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface RowBoxProps {
  label: string;
  second_label: string;
  value: string | number;
  second_value: string | number;
  highlight?: boolean;
}

export const rowBox = ({ label, value, highlight = false }: RowBoxProps) => {
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
