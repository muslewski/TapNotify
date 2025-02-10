import { getCampaignsByTeamSlug } from "@/actions/database/campaigns";
import CampaignClient from "@/app/app/[teamSlug]/campaigns/_components/client";
import Container from "@/app/app/_components/container";

export default async function CampaignsPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const { teamSlug } = await params;
  const campaigns = await getCampaignsByTeamSlug(teamSlug);

  return (
    <Container>
      <CampaignClient initialData={campaigns} />
    </Container>
  );
}
