"use client";

import { CellAction } from "@/app/app/[teamSlug]/contacts/_components/cell-action";
import { DateDisplayCell } from "@/app/app/_components/date-display-cell";
import SortButton from "@/app/app/_components/sort-button";
import { Contact } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export type ContactColumn = Contact & {
  // Add any additional properties if needed
};

export const columns: ColumnDef<ContactColumn>[] = [
  {
    accessorKey: "contactLabel",
    header: ({ column }) => (
      <SortButton column={column} label="Contact Label" />
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "displayName",
    header: "Display Name",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortButton column={column} label="Created At" />,
    cell: ({ row }) => (
      <DateDisplayCell date={new Date(row.original.createdAt)} />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <SortButton column={column} label="Updated At" />,
    cell: ({ row }) => (
      <DateDisplayCell date={new Date(row.original.updatedAt)} />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
