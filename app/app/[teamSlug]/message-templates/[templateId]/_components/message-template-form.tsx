"use client";

import EntityForm from "@/components/entity-form";
import { EntityConfig, FormFieldConfig } from "@/types/entity-form";
import { MessageTemplate } from "@prisma/client";
import { z } from "zod";

const messageTemplateSchema = z.object({
  title: z.string().min(1, "Name is required"),
  content: z.string().min(1, "Content is required"),
});

const messageTemplateFields = [
  {
    name: "title",
    label: "Title",
    placeholder: "🔥 Summer Mega Sale 2025",
    description: "This will help you find the template.",
    className: "max-w-xs",
    type: "text",
  },
  {
    name: "content",
    label: "Message Content",
    placeholder: "Hello {{name}}, Hot summer deals! Up to 50% OFF - shop now!",
    description: "Use {{name}} or {{phone}} to personalize the message.",
    className: "max-w-5xl",
    type: "textarea",
  },
] satisfies FormFieldConfig[];

export default function MessageTemplateForm({
  initialData,
}: {
  initialData?: MessageTemplate;
}) {
  const config = {
    entityName: "Message Template",
    entityNamePlural: "Message Templates",
    entityPath: "message-templates",
    entityParam: "templateId",
    schema: messageTemplateSchema,
    initialData: initialData,
    fields: messageTemplateFields,
  } satisfies EntityConfig<MessageTemplate>;

  return <EntityForm config={config} />;
}
