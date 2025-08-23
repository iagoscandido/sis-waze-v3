"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SubRoute } from "@/lib/definitions";

export const columnsSubRoute: ColumnDef<SubRoute>[] = [
  {
    accessorKey: "fromName",
    header: "Origem",
  },
  {
    accessorKey: "toName",
    header: "Destino",
  },
  {
    accessorKey: "time",
    header: "Tempo Atual",
    cell: ({ row }) =>
      `${Math.round((row.getValue("time") as number) / 60)} min`,
  },
  {
    accessorKey: "historicTime",
    header: "Tempo Histórico",
    cell: ({ row }) =>
      `${Math.round((row.getValue("historicTime") as number) / 60)} min`,
  },
  {
    accessorKey: "jamLevel",
    header: "Tráfego",
  },
];
