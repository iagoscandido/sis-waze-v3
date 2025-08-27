"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Bbox } from "@/lib/definitions";

export const columnsBbox: ColumnDef<Bbox>[] = [
  { accessorKey: "minX", header: "Min X" },
  { accessorKey: "minY", header: "Min Y" },
  { accessorKey: "maxX", header: "Max X" },
  { accessorKey: "maxY", header: "Max Y" },
];
