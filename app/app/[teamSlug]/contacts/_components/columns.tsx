"use client";

import { CellAction } from "@/app/app/[teamSlug]/contacts/_components/cell-action";
import SortButton from "@/app/app/_components/sort-button";
import { Contact } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type ContactColumn = Contact & {
  // Add any additional properties if needed
};

export const columns: ColumnDef<ContactColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortButton column={column} label="Name" />,
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortButton column={column} label="Created At" />,
    cell: ({ row }) =>
      format(new Date(row.original.createdAt), "MMM d, yyyy 'at' h:mm a"),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <SortButton column={column} label="Updated At" />,
    cell: ({ row }) =>
      format(new Date(row.original.updatedAt), "MMM d, yyyy 'at' h:mm a"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
