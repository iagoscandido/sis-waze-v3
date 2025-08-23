"use client";

import { ColumnDef } from "@tanstack/react-table";
import { leadAlert } from "@/lib/definitions";

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
