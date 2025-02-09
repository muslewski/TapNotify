"use client";

import { columns } from "@/app/app/[teamSlug]/campaigns/_components/columns";
import Heading from "@/app/app/_components/heading";
import { DataTable } from "@/components/data-table";
import { Campaign } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";

export default function CampaignClient({
  initialData,
}: {
  initialData: Campaign[];
}) {
  const params = useParams();

  return (
    <>
      <Heading
        title={`Campaigns (${0})`}
        description="Manage your campaigns"
        redirect={{
          label: "Add Campaign",
          href: `/app/${params.teamSlug}/campaigns/add`,
          icon: PlusIcon,
        }}
      />
      <DataTable columns={columns} data={initialData} />
    </>
  );
}
