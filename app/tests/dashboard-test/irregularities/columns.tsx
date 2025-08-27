// app/tests/irregularities/columns.tsx

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header"; // Importe o header customizado

// 1. Defina um tipo para um único item da tabela (um "Jam")
export interface Jam {
  id: number;
  street: string;
  city: string;
  jamLevel: number;
  delaySeconds: number;
  speed: number;
  length: number;
}

export const columns: ColumnDef<Jam>[] = [
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
    accessorKey: "jamLevel",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Nível de Congestionamento"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("jamLevel")}</div>
    ),
  },
  {
    accessorKey: "delaySeconds",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Atraso (segundos)" />
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("delaySeconds")}</div>
    ),
  },
  {
    accessorKey: "speed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Velocidade (km/h)" />
    ),
    cell: ({ row }) => {
      const speedKmh = parseFloat(row.getValue("speed")) * 3.6;
      return <div className="text-right">{speedKmh.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "length",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Extensão (m)" />
    ),
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("length")}</div>
    ),
  },
];
