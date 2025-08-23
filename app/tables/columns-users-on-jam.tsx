"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UsersOnJam } from "@/lib/definitions";

export const columnsUsersOnJam: ColumnDef<UsersOnJam>[] = [
  {
    accessorKey: "jamLevel",
    header: "Nível de Tráfego",
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

      return <span className={`px-2 py-1 rounded ${colorClass}`}>{label}</span>;
    },
  },
  {
    accessorKey: "wazersCount",
    header: "Qtd. Usuários",
  },
];
