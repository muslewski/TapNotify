import { getMessagesFromCampaign } from "@/actions/database/messages";
import CampaignMessagesClient from "@/app/app/[teamSlug]/campaigns/[campaignId]/messages/_components/client";
import Container from "@/app/app/_components/container";

export default async function CampaignMessagesPage({
  params,
}: {
  params: Promise<{ teamSlug: string; campaignId: string }>;
}) {
  const { teamSlug, campaignId } = await params;
  const messages = await getMessagesFromCampaign(teamSlug, campaignId);

  return (
    <Container>
      <CampaignMessagesClient initialData={messages} />
    </Container>
  );
}
