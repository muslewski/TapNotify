"use client";

import {
  CampaignMessagesColumn,
  columns,
} from "@/app/app/[teamSlug]/campaigns/[campaignId]/messages/_components/columns";
import Heading from "@/app/app/_components/heading";
import { DataTable } from "@/components/data-table";
import { MessagesSquareIcon, PencilIcon, SendIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CampaignMessagesClient({
  initialData,
}: {
  initialData: CampaignMessagesColumn[];
}) {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDeleteCampaign = async () => {
    setLoading(true);
    // Send request to delete entire campaign
    try {
      const response = await fetch(
        `/api/teams/${params.teamSlug}/campaigns/${params.campaignId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      toast.success("Campaign deleted successfully.");

      // Redirect to campaigns page
      router.push(`/app/${params.teamSlug}/campaigns`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete campaign.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendCampaign = async () => {
    // Send request to send campaign
    try {
      const response = await fetch(
        `/api/teams/${params.teamSlug}/campaigns/${params.campaignId}/send`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      toast.success("Campaign sent successfully.");

      // Refresh page
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send campaign.");
    }
  };

  return (
    <>
      <Heading
        title={`Campaign Messages`}
        mainIcon={MessagesSquareIcon}
        number={initialData.length}
        description="Preview your campaign messages."
        redirect={{
          label: "Edit Campaign",
          href: `/app/${params.teamSlug}/campaigns/${params.campaignId}`,
          icon: PencilIcon,
        }}
        customButton={
          initialData.length > 0
            ? {
                label: "Send Campaign",
                loading: loading,
                onClick: () => handleSendCampaign(),
                icon: SendIcon,
                confirmModal: {
                  heading: "Send Campaign",
                  description: "Are you sure you want to send this campaign?",
                },
              }
            : undefined
        }
        deleteButton={{
          label: "Delete Campaign",
          loading: loading,
          onClick: () => handleDeleteCampaign(),
          confirmModal: {
            heading: "Delete Campaign",
            description: "Are you sure you want to delete this campaign?",
          },
        }}
      />
      <DataTable
        searchFields={[{ key: "recipient_contactLabel", label: "recipients" }]}
        columns={columns}
        data={initialData}
        pageSize={4}
      />
    </>
  );
}
