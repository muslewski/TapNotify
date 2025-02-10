"use client";

import EntityForm from "@/components/entity-form";
import { EntityConfig, FormFieldConfig } from "@/types/entity-form";
import { Contact } from "@prisma/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .max(15, "Incorrect phone number")
    .regex(/^\+?[1-9]\d{1,14}$/, "Phone number must be in E.164 format"),
});

const contactFields = [
  {
    name: "name",
    label: "Name",
    placeholder: "John Doe",
    description: "The name as it should appear in messages.",
    className: "max-w-xs",
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
    schema: contactSchema,
    initialData: initialData,
    fields: contactFields,
  } satisfies EntityConfig<Contact>;

  return <EntityForm config={config} />;
}
