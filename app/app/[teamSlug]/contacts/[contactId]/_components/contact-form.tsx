"use client";

import EntityForm from "@/components/entity-form";
import { EntityConfig, FormFieldConfig } from "@/types/entity-form";
import { Contact } from "@prisma/client";
import { UserPenIcon, UserPlusIcon } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  contactLabel: z.string().min(1, "ContactLabel is required"),
  displayName: z.string().min(1, "Display name is required"),
  phone: z
    .string()
    .max(15, "Incorrect phone number")
    .regex(/^\+?[1-9]\d{1,14}$/, "Phone number must be in E.164 format"),
});

const contactFields = [
  {
    name: "contactLabel",
    label: "Contact Label",
    placeholder: "John Doe - Instagram Ads",
    description: "Internal name for identifying the contact.",
    className: "max-w-md",
    type: "text",
  },
  {
    name: "displayName",
    label: "Display Name",
    placeholder: "John",
    description: "The name as it should appear in dynamic messages.",
    className: "max-w-md",
    type: "text",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "123456789",
    description: "Used for SMS notifications.",
    className: "max-w-xs",
    type: "tel",
  },
] satisfies FormFieldConfig[];

export default function ContactForm({
  initialData,
}: {
  initialData?: Contact;
}) {
  const config = {
    entityName: "Contact",
    entityNamePlural: "Contacts",
    entityPath: "contacts",
    entityParam: "contactId",
    entityHeadingIcon: initialData ? UserPenIcon : UserPlusIcon,
    entityDescription: initialData
      ? "Update details for an existing contact."
      : "Add a new recipient to your contact list.",
    schema: contactSchema,
    initialData: initialData,
    fields: contactFields,
  } satisfies EntityConfig<Contact>;

  return <EntityForm config={config} />;
}
