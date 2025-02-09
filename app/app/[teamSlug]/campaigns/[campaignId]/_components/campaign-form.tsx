"use client";

import EntityForm from "@/components/entity-form";
import { ContactSearchField } from "@/components/fields/contact-search";
import { TemplateSelectField } from "@/components/fields/template-select";
import { EntityConfig, FormFieldConfig } from "@/types";
import { Campaign } from "@prisma/client";
import { z } from "zod";

const campaignSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .max(13, "Incorrect phone number")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

const campaignFields = [
  {
    name: "name",
    label: "Campaign Name",
    type: "text",
    className: "max-w-xl",
    placeholder: "Summer Sale 2025",
  },
  {
    name: "contactIds",
    label: "Select Contacts",
    type: "custom",
    className: "max-w-md",
    component: ContactSearchField,
    customProps: {
      // Any additional props you want to pass to the component
      maxSelections: 10,
    },
  },
  {
    name: "templateId",
    label: "Message Template",
    type: "custom",
    className: "max-w-2xl",
    component: TemplateSelectField,
    customProps: {
      templates: [], // You'll need to fetch and pass templates here
    },
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
    entityParam: "campaignId",
    schema: campaignSchema,
    initialData: initialData,
    fields: campaignFields,
  } satisfies EntityConfig<Campaign>;

  return <EntityForm config={config} />;
}
