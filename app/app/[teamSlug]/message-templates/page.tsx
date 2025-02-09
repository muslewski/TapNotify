import { getMessageTemplatesByTeamSlug } from "@/actions/message-templates";
import ContactClient from "@/app/app/[teamSlug]/message-templates/_components/client";
import Container from "@/app/app/_components/container";

export default async function MessageTemplatesPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const { teamSlug } = await params;

  const templates = await getMessageTemplatesByTeamSlug(teamSlug);

  return (
    <Container>
      <ContactClient initialData={templates} />
    </Container>
  );
}
