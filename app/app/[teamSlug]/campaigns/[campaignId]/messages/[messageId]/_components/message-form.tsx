"use client";

import EntityForm from "@/components/entity-form";
import { ContactSearchField } from "@/components/fields/contact-search";
import { TemplateSelectField } from "@/components/fields/template-select";
import { EntityConfig, FormFieldConfig } from "@/types/entity-form";
import { Message, Contact, MessageTemplate } from "@prisma/client";
import { MessageSquare, MessageSquarePlusIcon } from "lucide-react";
import { z } from "zod";

interface MessageWithRelations extends Message {
  recipient?: Contact | null;
  template?: MessageTemplate | null;
}

// Define the base schema without refinements
const messageSchema = z.object({
  withTemplate: z.boolean().default(false),
  templateId: z.string().optional(),
  message: z.string().optional(),
  recipientId: z.string({
    required_error: "Recipient is required",
  }),
});

// Separate validation function to be used in the form
const validateMessageForm = (data: z.infer<typeof messageSchema>) => {
  if (data.withTemplate && !data.templateId) {
    return { templateId: "Template must be selected when using template mode" };
  }
  if (!data.withTemplate && (!data.message || data.message.trim() === "")) {
    return { message: "Message is required when not using a template" };
  }
  return {};
};

const getMessageFields = (
  initialData?: MessageWithRelations
): FormFieldConfig[] => [
  {
    name: "withTemplate",
    label: "Message Type",
    description: "Choose whether to use a template or write a custom message.",
    type: "custom",
    component: ({ field, form }) => (
      <div className="space-y-4">
        <div className="flex gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={!field.value}
              onChange={() => {
                form.setValue("withTemplate", false);
                form.setValue("templateId", undefined);
                form.clearErrors();
              }}
              className="h-4 w-4"
            />
            <span>Custom Message</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              checked={field.value}
              onChange={() => {
                form.setValue("withTemplate", true);
                form.setValue("message", undefined);
                form.clearErrors();
              }}
              className="h-4 w-4"
            />
            <span>Use Template</span>
          </label>
        </div>
      </div>
    ),
  },
  {
    name: "recipientId",
    label: "Select Contact",
    description: "Select a contact to send the message to.",
    type: "custom",
    className: "max-w-md",
    component: ContactSearchField,
    customProps: {
      initialSelectedContacts: initialData?.recipient
        ? [initialData.recipient]
        : [],
      singleSelect: true,
    },
  },
  {
    name: "message",
    label: "Message",
    description: "Write your custom message.",
    type: "textarea",
    className: "max-w-2xl",
    placeholder: "Enter your message here...",
    hidden: (formData) => formData.withTemplate === true,
  },
  {
    name: "templateId",
    label: "Message Template",
    description: "Select a message template to use.",
    type: "custom",
    className: "max-w-2xl",
    component: TemplateSelectField,
    hidden: (formData) => formData.withTemplate === false,
    customProps: initialData?.template
      ? {
          initialSelectedTemplate: initialData.template,
        }
      : undefined,
  },
];

export default function MessageForm({
  initialData,
}: {
  initialData?: MessageWithRelations;
}) {
  const defaultValues = {
    withTemplate: initialData?.templateId ? true : false,
    templateId: initialData?.templateId || undefined,
    message: initialData?.message || undefined,
    recipientId: initialData?.recipientId || "",
  };

  const config = {
    entityName: "Message",
    entityNamePlural: "Messages",
    entityPath: "messages",
    entityParam: "messageId",
    entityHeadingIcon: initialData ? MessageSquare : MessageSquarePlusIcon,
    entityDescription: initialData
      ? "Modify an existing message."
      : "Create a new message by selecting a contact and composing your message.",
    schema: messageSchema,
    initialData: defaultValues,
    fields: getMessageFields(initialData),
    onValidate: validateMessageForm,
  } satisfies EntityConfig<Message>;

  return <EntityForm config={config} />;
}
