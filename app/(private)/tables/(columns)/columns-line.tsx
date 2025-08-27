"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Line } from "@/lib/definitions";

export const columnsLine: ColumnDef<Line>[] = [
  {
    accessorKey: "x",
    header: "Coordenada X",
  },
  {
    accessorKey: "y",
    header: "Coordenada Y",
  },
];
