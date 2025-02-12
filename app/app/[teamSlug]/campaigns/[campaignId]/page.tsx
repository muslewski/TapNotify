import {
  checkIfCampaignBelongsToTeam,
  getCampaignByCampaignId,
} from "@/actions/database/campaigns";
import CampaignForm from "@/app/app/[teamSlug]/campaigns/[campaignId]/_components/campaign-form";
import Container from "@/app/app/_components/container";
import NotFound from "@/app/app/_components/not-found";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ teamSlug: string; campaignId: string }>;
}): Promise<Metadata> {
  const { campaignId } = await params;
  // If it's a new campaign
  if (campaignId === "add") {
    return {
      title: "Create Campaign",
      description: "Create a new campaign",
    };
  }

  // If it's an existing campaign
  const campaign = await getCampaignByCampaignId(campaignId);

  if (!campaign) {
    return {
      title: "Campaign Not Found",
      description: "The requested campaign could not be found",
    };
  }

  return {
    title: `Edit Campaign: ${campaign.title || "Untitled"}`,
    description: `Edit campaign details for ${campaign.title || "Untitled"}`,
  };
}

export default async function CreateCampaignPage({
  params,
}: {
  params: Promise<{ teamSlug: string; campaignId: string }>;
}) {
  const { campaignId, teamSlug } = await params;

  const campaign = await getCampaignByCampaignId(campaignId);

  // If campaign is not found and campaignId is not "create", show 404
  if (!campaignId && campaignId !== "add") {
    return (
      <Container>
        <NotFound />
      </Container>
    );
  }

  // Check if campaign belongs to the team
  if (
    !(await checkIfCampaignBelongsToTeam(campaignId, teamSlug)) &&
    campaignId !== "add"
  ) {
    return (
      <Container>
        <NotFound />
      </Container>
    );
  }

  return (
    <Container>
      <CampaignForm initialData={campaign || undefined} />
    </Container>
  );
}
