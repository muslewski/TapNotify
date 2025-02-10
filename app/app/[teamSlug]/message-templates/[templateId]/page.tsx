import { getMessageTemplateByTemplateId } from "@/actions/database/message-templates";
import MessageTemplateForm from "@/app/app/[teamSlug]/message-templates/[templateId]/_components/message-template-form";
import Container from "@/app/app/_components/container";
import NotFound from "@/app/app/_components/not-found";

export default async function CreateMessageTemplatePage({
  params,
}: {
  params: Promise<{ teamSlug: string; templateId: string }>;
}) {
  const { templateId } = await params;

  const template = await getMessageTemplateByTemplateId(templateId);

  // If template is not found and templateId is not "create", show 404
  if (!template && templateId !== "create") {
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
