"use client";

import { CellAction } from "@/app/app/[teamSlug]/campaigns/_components/cell-action";
import { MessageTemplateCell } from "@/app/app/[teamSlug]/campaigns/_components/message-template-cell";
import SortButton from "@/app/app/_components/sort-button";
import { StatusBadge } from "@/app/app/_components/status-badge";
import { Campaign, MessageTemplate } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type CampaignColumn = Campaign & {
  template: MessageTemplate;
  // Add any additional properties if needed
};

export const columns: ColumnDef<CampaignColumn>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} type="campaign" />
    ),
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
    cell: ({ row }) => (
      <MessageTemplateCell
        title={row.original.template.title}
        content={row.original.template.content}
      />
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
