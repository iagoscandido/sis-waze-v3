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
  children?: React.ReactNode;
}

export function CityFilter({
  selectedCity,
  children = "Rio de Janeiro",
}: CityFilterProps) {
  return (
    <Select value={selectedCity} disabled>
      <SelectTrigger className="w-[220px] opacity-70 cursor-not-allowed">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Rio de Janeiro">{children}</SelectItem>
      </SelectContent>
    </Select>
  );
}
