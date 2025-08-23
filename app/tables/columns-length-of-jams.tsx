"use client";

import { ColumnDef } from "@tanstack/react-table";
import { lengthOfJams } from "@/lib/definitions";

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
