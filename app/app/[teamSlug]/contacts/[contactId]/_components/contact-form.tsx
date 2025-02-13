"use client";

import { PhoneInput } from "@/app/app/_components/phone-number-input";
import EntityForm from "@/components/entity-form";
import { useTeamStore } from "@/store/use-team-store";
import { EntityConfig, FormFieldConfig } from "@/types/entity-form";
import { Contact } from "@prisma/client";
import { UserPenIcon, UserPlusIcon } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  contactLabel: z.string().min(1, "Contact label is required"),
  displayName: z.string().min(1, "Display name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+[1-9]\d{1,14}$/,
      "Phone number must be in E.164 format (e.g., +1234567890)"
    ),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm({
  initialData,
}: {
  initialData?: Contact;
}) {
  const { activeTeam } = useTeamStore();

  const contactFields: FormFieldConfig[] = [
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
      placeholder: "",
      description: "Used for SMS notifications.",
      className: "max-w-xs",
      type: "custom",
      component: PhoneInput,
      customProps: {
        defaultCountryCode: activeTeam?.defaultCountryCode,
        initialValue: initialData?.phone,
      },
    },
  ];

  const config: EntityConfig<Contact> = {
    entityName: "Contact",
    entityNamePlural: "Contacts",
    entityPath: "contacts",
    entityParam: "contactId",
    entityHeadingIcon: initialData ? UserPenIcon : UserPlusIcon,
    entityDescription: initialData
      ? "Update details for an existing contact."
      : "Add a new recipient to your contact list.",
    schema: contactSchema,
    initialData,
    fields: contactFields,
  };

  return <EntityForm config={config} />;
}
