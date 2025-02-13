"use client";

import { CellAction } from "@/app/app/[teamSlug]/campaigns/_components/cell-action";
import OpenMessagesButton from "@/app/app/[teamSlug]/campaigns/_components/open-messages-button";
import { DateDisplayCell } from "@/app/app/_components/date-display-cell";
import { HeaderWithTooltip } from "@/app/app/_components/header-with-tooltip";
import { MessageTemplateCell } from "@/app/app/_components/message-template-cell";
import SortButton from "@/app/app/_components/sort-button";
import { StatusBadge } from "@/app/app/_components/status-badge";
import {
  Campaign,
  Message,
  MessageTemplate,
  User as PrismaUser,
} from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export type CampaignColumn = Campaign & {
  template: MessageTemplate & { user: PrismaUser };
  messages: Message[];
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
    accessorKey: "alphanumericSenderId",
    header: () => (
      <HeaderWithTooltip
        label="Alphanumeric Sender ID"
        tooltipText="A unique identifier that appears as the sender of SMS messages. Must contain only letters and numbers."
      />
    ),
  },
  {
    accessorKey: "messages",
    header: () => (
      <HeaderWithTooltip
        label="Messages"
        tooltipText="Open to preview you messages."
      />
    ),
    cell: ({ row }) => (
      <OpenMessagesButton
        contactLength={row.original.messages.length}
        data={row.original}
      />
    ),
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
