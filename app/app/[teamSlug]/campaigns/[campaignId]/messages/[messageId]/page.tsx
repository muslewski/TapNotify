import {
  checkIfMessageBelongsToCampaign,
  getMessageByMessageId,
} from "@/actions/database/messages";
import MessageForm from "@/app/app/[teamSlug]/campaigns/[campaignId]/messages/[messageId]/_components/message-form";
import Container from "@/app/app/_components/container";
import NotFound from "@/app/app/_components/not-found";

export default async function CreateMessagePage({
  params,
}: {
  params: Promise<{ teamSlug: string; campaignId: string; messageId: string }>;
}) {
  const { campaignId, teamSlug, messageId } = await params;

  const message = await getMessageByMessageId(teamSlug, campaignId, messageId);

  // If campaign is not found and campaignId is not "create", show 404
  if (!messageId && messageId !== "add") {
    return (
      <Container>
        <NotFound />
      </Container>
    );
  }

  // Check if campaign belongs to the team
  if (
    !(await checkIfMessageBelongsToCampaign(messageId, campaignId, teamSlug)) &&
    messageId !== "add"
  ) {
    return (
      <Container>
        <NotFound />
      </Container>
    );
  }

  return (
    <Container>
      <MessageForm initialData={message || undefined} />
    </Container>
  );
}
