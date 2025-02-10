"use client";

import EntityForm from "@/components/entity-form";
import { ContactSearchField } from "@/components/fields/contact-search";
import { TemplateSelectField } from "@/components/fields/template-select";
import { EntityConfig, FormFieldConfig } from "@/types";
import { Campaign } from "@prisma/client";
import { z } from "zod";

const campaignSchema = z.object({
  title: z.string().min(1, "Name is required"),
  contactIds: z.array(z.string()),
  templateId: z.string(),
});

const campaignFields = [
  {
    name: "title",
    label: "Title",
    description: "The title of the campaign.",
    type: "text",
    className: "max-w-xl",
    placeholder: "Summer Sale 2025",
  },
  {
    name: "contactIds",
    label: "Select Contacts",
    description: "Select contacts to include in the campaign.",
    type: "custom",
    className: "max-w-md",
    component: ContactSearchField,
  },
  {
    name: "templateId",
    label: "Message Template",
    description: "Select a message template for the campaign.",
    type: "custom",
    className: "max-w-2xl",
    component: TemplateSelectField,
  },
] satisfies FormFieldConfig[];

export default function CampaignForm({
  initialData,
}: {
  initialData?: Campaign;
}) {
  const config = {
    entityName: "Campaign",
    entityNamePlural: "Campaigns",
    entityPath: "campaigns",
    entityParam: "campaignId",
    schema: campaignSchema,
    initialData: initialData,
    fields: campaignFields,
  } satisfies EntityConfig<Campaign>;

  return <EntityForm config={config} />;
}
