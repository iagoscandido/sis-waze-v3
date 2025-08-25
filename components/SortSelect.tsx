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

interface SortSelectProps<T> {
  options: SortOption[];
  onSort: (value: string) => void;
}

export function SortSelect<T>({ options, onSort }: SortSelectProps<T>) {
  return (
    <Select onValueChange={(value) => onSort(value)}>
      <SelectTrigger className="w-[180px]">
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
