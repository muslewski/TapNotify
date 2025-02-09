"use client";

import EntityForm from "@/components/entity-form";
import { FormFieldConfig } from "@/types";
import { PhoneNumber } from "@prisma/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .max(13, "Incorrect phone number")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

const contactFields = [
  {
    name: "name",
    label: "Name",
    placeholder: "John Doe",
    className: "max-w-xs",
    type: "text",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "+48 123 456 789",
    className: "max-w-xs",
    type: "tel",
  },
] satisfies FormFieldConfig[];

export default function ContactForm({
  initialData,
}: {
  initialData?: PhoneNumber;
}) {
  const config = {
    entityName: "Contact",
    entityNamePlural: "Contacts",
    schema: contactSchema,
    initialData,
    fields: contactFields,
  };

  return <EntityForm config={config} />;
}
