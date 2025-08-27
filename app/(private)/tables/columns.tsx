"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Bbox,
  Irregularities,
  leadAlert,
  lengthOfJams,
  Line,
  Route,
  SubRoute,
  WazeRoute,
} from "@/lib/definitions";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export const columnsBbox: ColumnDef<Bbox>[] = [
  { accessorKey: "minX", header: "Min X" },
  { accessorKey: "minY", header: "Min Y" },
  { accessorKey: "maxX", header: "Max X" },
  { accessorKey: "maxY", header: "Max Y" },
];

export const columnsWazeRoute: ColumnDef<WazeRoute>[] = [
  {
    accessorKey: "name",
    header: "Rota",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <span className="font-medium">{name}</span>;
    },
  },
  {
    accessorKey: "time",
    header: "Tempo Atual",
    cell: ({ row }) => {
      const time = row.getValue("time") as number;
      const minutes = Math.round(time / 60);
      return <span>{minutes} min</span>;
    },
  },
  {
    accessorKey: "historicTime",
    header: "Tempo Histórico",
    cell: ({ row }) => {
      const historicTime = row.getValue("historicTime") as number;
      const minutes = Math.round(historicTime / 60);
      return <span>{minutes} min</span>;
    },
  },
  {
    accessorKey: "jamLevel",
    header: "Tráfego",
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
];

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

export const columnsLeadAlert: ColumnDef<leadAlert>[] = [
  {
    accessorKey: "city",
    header: "Cidade",
  },
  {
    accessorKey: "street",
    header: "Rua",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "subType",
    header: "Subtipo",
  },
  {
    accessorKey: "numThumbsUp",
    header: "Curtidas",
  },
  {
    accessorKey: "numComents",
    header: "Comentários",
  },
];

export const columnsLengthOfJams: ColumnDef<lengthOfJams>[] = [
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
