"use client";

import { CellAction } from "@/app/app/[teamSlug]/message-templates/_components/cell-action";
import { DateDisplayCell } from "@/app/app/_components/date-display-cell";
import { MessageContentCell } from "@/app/app/_components/message-content-cell";
import SortButton from "@/app/app/_components/sort-button";
import { MessageTemplate } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export type MessageTemplateColumn = MessageTemplate & {
  // Add any additional properties if needed
};

export const columns: ColumnDef<MessageTemplateColumn>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <SortButton column={column} label="Title" />,
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => <MessageContentCell content={row.original.content} />,
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
