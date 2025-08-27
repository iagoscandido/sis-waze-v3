"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Irregularities } from "@/lib/definitions";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export const columnsIrregularities: ColumnDef<Irregularities>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      <DataTableColumnHeader column={column} title="Nome" />;
    },
  },
  {
    accessorKey: "fromName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Origem" />
    ),
  },
  {
    accessorKey: "toName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Destino" />
    ),
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tempo" />
    ),
    cell: ({ row }) =>
      `${Math.round((row.getValue("time") as number) / 60)} min`,
  },
  {
    accessorKey: "historicTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tempo Histórico" />
    ),
    cell: ({ row }) =>
      `${Math.round((row.getValue("historicTime") as number) / 60)} min`,
  },
  {
    accessorKey: "jamLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nível de jam" />
    ),
  },
  {
    accessorKey: "length",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comprimento" />
    ),
    cell: ({ row }) => `${(row.getValue("length") as number) / 1000} km`,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
  },
  {
    accessorKey: "leadAlert",
    header: ({ column }) => {
      <DataTableColumnHeader column={column} title="Alertas de Lead" />;
    },
    cell: ({ row }) =>
      `${(row.getValue("leadAlert") as boolean) ? "Sim" : "Não"}`,
  },
];
