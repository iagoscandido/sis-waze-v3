"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SortOption {
  label: string;
  value: string;
}

interface SortSelectProps {
  options: SortOption[];
  defaultValue?: string; // valor inicial do Select
  onSort: (value: string) => void;
}

export function SortSelect({ options, defaultValue, onSort }: SortSelectProps) {
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) => onSort(value)}
    >
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Ordenar" />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
