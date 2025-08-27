"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Route } from "@/lib/definitions";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export const columnsRoute: ColumnDef<Route>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      <DataTableColumnHeader column={column} title="Nome" />;
    },
  },
  {
    accessorKey: "fromName",
    header: ({ column }) => {
      <DataTableColumnHeader column={column} title="Origem" />;
    },
  },
  {
    accessorKey: "toName",
    header: ({ column }) => {
      <DataTableColumnHeader column={column} title="Destino" />;
    },
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      <DataTableColumnHeader column={column} title="Tempo Atual" />;
    },
    cell: ({ row }) =>
      `${Math.round((row.getValue("time") as number) / 60)} min`,
  },
  {
    accessorKey: "historicTime",
    header: ({ column }) => {
      <DataTableColumnHeader column={column} title="Tempo Histórico" />;
    },
    cell: ({ row }) =>
      `${Math.round((row.getValue("historicTime") as number) / 60)} min`,
  },
  {
    accessorKey: "jamLevel",
    header: ({ column }) => {
      <DataTableColumnHeader
        column={column}
        title="Nível de congestionamento"
      />;
    },
  },
];
