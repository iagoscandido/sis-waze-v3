"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Route } from "@/lib/definitions";

export const columnsRoute: ColumnDef<Route>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
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
