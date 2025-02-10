"use client";

import { CellAction } from "@/app/app/[teamSlug]/message-templates/_components/cell-action";
import SortButton from "@/app/app/_components/sort-button";
import { formatTemplateContent } from "@/components/format-template-content";
import { MessageTemplate } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type MessageTemplateColumn = MessageTemplate & {
  // Add any additional properties if needed
};

export const columns: ColumnDef<MessageTemplate>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <SortButton column={column} label="Title" />,
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => (
      <div className="">{formatTemplateContent(row.original.content)}</div>
    ),
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
