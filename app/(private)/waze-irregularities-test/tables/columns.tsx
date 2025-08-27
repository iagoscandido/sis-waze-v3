"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Irregularities, Line } from "@/lib/types/irregularities";

export const columnsIrregularities: ColumnDef<Irregularities>[] = [
  {
    accessorKey: "street",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rua" />
    ),
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cidade" />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
  },
  {
    accessorKey: "jamLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tráfego" />
    ),
    cell: ({ row }) => {
      const jamLevel = row.getValue("jamLevel") as number;

      let colorClass = "bg-green-100 text-green-800";
      let label = "Livre";

      if (jamLevel === 1) {
        colorClass = "bg-yellow-100 text-yellow-800";
        label = "Leve";
      } else if (jamLevel === 2) {
        colorClass = "bg-orange-100 text-orange-800";
        label = "Moderado";
      } else if (jamLevel === 3) {
        colorClass = "bg-red-100 text-red-800";
        label = "Pesado";
      } else if (jamLevel >= 4) {
        colorClass = "bg-red-600 text-white";
        label = "Parado";
      }

      return <Badge className={`${colorClass}`}>{label}</Badge>;
    },
  },
  {
    accessorKey: "seconds",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duração (s)" />
    ),
    cell: ({ row }) =>
      `${((row.getValue("seconds") as number) / 60).toFixed(2)} min`,
  },
  {
    accessorKey: "length",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comprimento (m)" />
    ),
    cell: ({ row }) => `${row.getValue("length") as number} m`,
  },
];

// Colunas para Line
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
