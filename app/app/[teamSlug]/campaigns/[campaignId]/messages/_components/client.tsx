"use client";

import {
  CampaignMessagesColumn,
  columns,
} from "@/app/app/[teamSlug]/campaigns/[campaignId]/messages/_components/columns";
import Heading from "@/app/app/_components/heading";
import { DataTable } from "@/components/data-table";
import { MessagesSquareIcon, PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";

export default function CampaignMessagesClient({
  initialData,
}: {
  initialData: CampaignMessagesColumn[];
}) {
  const params = useParams();

  return (
    <>
      <Heading
        title={`Campaign Messages`}
        mainIcon={MessagesSquareIcon}
        number={initialData.length}
        description="Create, manage, and track your campaign messages."
        redirect={{
          label: "Add Message",
          href: `/app/${params.teamSlug}/campaigns/${params.campaignId}/messages/add`,
          icon: PlusIcon,
        }}
      />
      <DataTable
        searchKey="message"
        searchKeyLabel="messages"
        columns={columns}
        data={initialData}
        pageSize={4}
      />
    </>
  );
}
