"use client";

import { ColumnDef } from "@tanstack/react-table";
import { WazeRoute } from "@/lib/definitions";
import { Badge } from "@/components/ui/badge";

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
