"use client";

// import { CellAction } from "@/app/app/[teamSlug]/campaigns/[campaignId]/messages/_components/cell-action";
import { DateDisplayCell } from "@/app/app/_components/date-display-cell";
import { MessageTemplateCell } from "@/app/app/_components/message-template-cell";
import { RecipientCell } from "@/app/app/_components/recipient-cell";
import SortButton from "@/app/app/_components/sort-button";
import { StatusBadge } from "@/app/app/_components/status-badge";
import {
  Message,
  MessageTemplate,
  User as PrismaUser,
  Contact,
} from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export type CampaignMessagesColumn = Message & {
  template: (MessageTemplate & { user: PrismaUser }) | null;
  recipient: Contact & { user: PrismaUser };
  // Add any additional properties if needed
};

export const columns: ColumnDef<CampaignMessagesColumn>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge
        status={row.original.status}
        errorMessage={row.original.errorMessage}
        type="message"
      />
    ),
  },
  // {
  //   accessorKey: "message",
  //   header: "Message",
  // },
  {
    accessorKey: "recipient.contactLabel",
    header: "Recipient",
    cell: ({ row }) => <RecipientCell recipient={row.original.recipient} />,
  },

  {
    accessorKey: "template.title",
    header: "Message Template",
    cell: ({ row }) => (
      <MessageTemplateCell
        template={row.original.template}
        disabled={!row.original.template}
      />
    ),
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
  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
