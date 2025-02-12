"use client";

import { CellAction } from "@/app/app/[teamSlug]/campaigns/[campaignId]/messages/_components/cell-action";
import { DateDisplayCell } from "@/app/app/_components/date-display-cell";
import { MessageTemplateCell } from "@/app/app/_components/message-template-cell";
import SortButton from "@/app/app/_components/sort-button";
import { StatusBadge } from "@/app/app/_components/status-badge";
import { Message, MessageTemplate, User as PrismaUser } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export type CampaignMessagesColumn = Message & {
  template: (MessageTemplate & { user: PrismaUser }) | null;
  // Add any additional properties if needed
};

export const columns: ColumnDef<CampaignMessagesColumn>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} type="campaign" />
    ),
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "template.title",
    header: "Message Template",
    cell: ({ row }) => <MessageTemplateCell template={row.original.template} />,
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
