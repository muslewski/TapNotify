import {
  checkIfCampaignBelongsToTeam,
  getCampaignByCampaignId,
} from "@/actions/database/campaigns";
import CampaignForm from "@/app/app/[teamSlug]/campaigns/[campaignId]/_components/campaign-form";
import Container from "@/app/app/_components/container";
import NotFound from "@/app/app/_components/not-found";

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
