"use client";

import {
  CampaignColumn,
  columns,
} from "@/app/app/[teamSlug]/campaigns/_components/columns";
import Heading from "@/app/app/_components/heading";
import { DataTable } from "@/components/data-table";
import { PlusIcon, Waypoints } from "lucide-react";
import { useParams } from "next/navigation";

export default function CampaignClient({
  initialData,
}: {
  initialData: CampaignColumn[];
}) {
  const params = useParams();

  return (
    <>
      <Heading
        title={`Campaigns`}
        mainIcon={Waypoints}
        number={initialData.length}
        description="Create, manage, and track your notification campaigns."
        redirect={{
          label: "Add Campaign",
          href: `/app/${params.teamSlug}/campaigns/add`,
          icon: PlusIcon,
        }}
      />
      <DataTable
        searchFields={[{ key: "title", label: "titles" }]}
        columns={columns}
        data={initialData}
        pageSize={4}
      />
    </>
  );
}
