"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CityFilterProps {
  selectedCity: string;
}

export function CityFilter({ selectedCity }: CityFilterProps) {
  return (
    <Select value={selectedCity} disabled>
      <SelectTrigger className="w-[220px] opacity-70 cursor-not-allowed">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Rio de Janeiro">Rio de Janeiro</SelectItem>
      </SelectContent>
    </Select>
  );
}
