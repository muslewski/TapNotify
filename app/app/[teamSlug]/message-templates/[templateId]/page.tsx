import {
  checkIfTemplateBelongsToTeam,
  getMessageTemplateByTemplateId,
} from "@/actions/database/message-templates";
import MessageTemplateForm from "@/app/app/[teamSlug]/message-templates/[templateId]/_components/message-template-form";
import Container from "@/app/app/_components/container";
import NotFound from "@/app/app/_components/not-found";

export default async function CreateMessageTemplatePage({
  params,
}: {
  params: Promise<{ teamSlug: string; templateId: string }>;
}) {
  const { templateId, teamSlug } = await params;

  const template = await getMessageTemplateByTemplateId(templateId);

  // If template is not found and templateId is not "add", show 404
  if (!template && templateId !== "add") {
    return (
      <Container>
        <NotFound />
      </Container>
    );
  }

  // Check if template belongs to the team
  if (
    !(await checkIfTemplateBelongsToTeam(templateId, teamSlug)) &&
    templateId !== "add"
  ) {
    return (
      <Container>
        <NotFound />
      </Container>
    );
  }

  return (
    <Container>
      <MessageTemplateForm initialData={template ?? undefined} />
    </Container>
  );
}
