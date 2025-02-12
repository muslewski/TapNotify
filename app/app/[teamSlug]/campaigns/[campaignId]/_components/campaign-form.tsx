"use client";

import EntityForm from "@/components/entity-form";
import { ContactSearchField } from "@/components/fields/contact-search";
import { TemplateSelectField } from "@/components/fields/template-select";
import { EntityConfig, FormFieldConfig } from "@/types/entity-form";
import { Campaign, Contact, Message, MessageTemplate } from "@prisma/client";
import { FolderPenIcon, FolderPlusIcon } from "lucide-react";
import { z } from "zod";

// Extend the Campaign type to include related data
interface CampaignWithRelations extends Campaign {
  messages?: Array<Message & { recipient: Contact }>;
  template?: MessageTemplate;
}

const campaignSchema = z.object({
  title: z.string().min(1, "Name is required"),
  alphanumericSenderId: z
    .string()
    .min(1, "Alphanumeric Sender ID is required")
    .max(11, "Alphanumeric Sender ID must not exceed 11 characters")
    .refine((val) => val.trim().length > 0, {
      message: "Alphanumeric Sender ID cannot be empty or contain only spaces",
    })
    .refine((val) => /^[a-zA-Z0-9 ]+$/.test(val), {
      message:
        "Alphanumeric Sender ID can only contain letters, numbers, and spaces",
    }),
  contactIds: z.array(z.string()),
  templateId: z.string(),
});

// Create a function to extract contact IDs from campaign messages
const getInitialContacts = (campaign: CampaignWithRelations): Contact[] => {
  if (!campaign.messages) return [];
  return campaign.messages.map((message) => message.recipient);
};

const getCampaignFields = (
  initialData?: CampaignWithRelations
): FormFieldConfig[] => [
  {
    name: "title",
    label: "Title",
    description: "Only visible to you and your team.",
    type: "text",
    className: "max-w-xl",
    placeholder: "Summer Sale 2025",
  },
  {
    name: "alphanumericSenderId",
    label: "Alphanumeric Sender ID",
    description:
      "This is the name that will appear as the sender of your SMS messages.",
    type: "text",
    className: "max-w-xl",
    placeholder: "MyCompany",
  },
  {
    name: "contactIds",
    label: "Select Contacts",
    description: "Select contacts to include in the campaign.",
    type: "custom",
    className: "max-w-md",
    component: ContactSearchField,
    customProps: initialData
      ? {
          initialSelectedContacts: getInitialContacts(initialData),
        }
      : undefined,
  },
  {
    name: "templateId",
    label: "Message Template",
    description: "Select a message template for the campaign.",
    type: "custom",
    className: "max-w-2xl",
    component: TemplateSelectField,
    customProps: initialData
      ? {
          initialSelectedTemplate: initialData.template,
        }
      : undefined,
  },
];

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
    entityHeadingIcon: initialData ? FolderPenIcon : FolderPlusIcon,
    entityDescription: initialData
      ? "Modify an existing campaign's details."
      : "Launch a new campaign by selecting contacts and a message template.",
    schema: campaignSchema,
    initialData: initialData,
    fields: getCampaignFields(initialData),
  } satisfies EntityConfig<Campaign>;

  return <EntityForm config={config} />;
}
