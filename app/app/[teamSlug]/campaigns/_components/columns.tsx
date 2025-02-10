"use client";

import SortButton from "@/app/app/_components/sort-button";
import { Campaign } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortButton column={column} label="Title" />,
  },
  {
    // TODO: This should be redirection to manage contacts
    accessorKey: "messages.length",
    header: "Contacts",
  },
  {
    // TODO: This should display the preview of the message with edit button
    accessorKey: "template.title",
    header: "Message Template",
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
];
