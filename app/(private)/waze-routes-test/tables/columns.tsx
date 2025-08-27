"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import {
  Routes,
  LengthOfJams,
  Irregularities,
  Coordinates,
} from "@/lib/types/routes-definitions";

// Rotas
export const columnsRoutes: ColumnDef<Routes>[] = [
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
      <DataTableColumnHeader column={column} title="Tempo Atual (s)" />
    ),
    cell: ({ row }) => `${row.getValue("time") as number} s`,
  },
  {
    accessorKey: "historicTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tempo Histórico (s)" />
    ),
    cell: ({ row }) => `${row.getValue("historicTime") as number} s`,
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
    accessorKey: "length",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comprimento (m)" />
    ),
  },
];

// Length of Jams
export const columnsLengthOfJams: ColumnDef<LengthOfJams>[] = [
  {
    accessorKey: "jamLevel",
    header: "Nível de Tráfego",
  },
  {
    accessorKey: "jamLength",
    header: "Comprimento do Congestionamento (km)",
    cell: ({ row }) => {
      const length = row.getValue("jamLength") as number;
      return `${(length / 1000).toFixed(2)} km`;
    },
  },
];

// Irregularities
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
    cell: ({ row }) => `${row.getValue("seconds") as number} s`,
  },
  {
    accessorKey: "length",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comprimento (m)" />
    ),
    cell: ({ row }) => `${row.getValue("length") as number} m`,
  },
];

// Coordinates (linha)
export const columnsCoordinates: ColumnDef<Coordinates>[] = [
  { accessorKey: "x", header: "Coordenada X" },
  { accessorKey: "y", header: "Coordenada Y" },
];
