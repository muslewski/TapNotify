"use client";

import { formatTemplateContent } from "@/components/format-template-content";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Pencil,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import { MessageTemplate, User as PrismaUser } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SmartCell } from "@/components/smart-cell";

interface MessageTemplateCellProps {
  template: (MessageTemplate & { user: PrismaUser }) | null;
  disabled?: boolean;
}

export const MessageTemplateCell = ({
  template,
  disabled = false,
}: MessageTemplateCellProps) => {
  const params = useParams();

  if (!template) {
    return (
      <SmartCell
        icon={AlertCircle}
        title="No message template selected"
        preview=""
        disabled
      />
    );
  }

  const createPlainTextPreview = (content: string) => {
    return content.replace(/\{\{(.+?)\}\}/g, "$1");
  };

  const plainTextContent = createPlainTextPreview(template.content);
  const previewContent =
    plainTextContent.length > 60
      ? `${plainTextContent.slice(0, 60)}...`
      : plainTextContent;

  return (
    <SmartCell
      icon={disabled ? AlertTriangle : MessageSquare}
      title={template.title}
      preview={disabled ? "Template disabled" : previewContent}
      badge={{
        label: disabled ? "Disabled" : "Preview",
        variant: disabled ? "destructive" : "secondary",
      }}
      disabled={disabled}
      createdAt={new Date(template.createdAt)}
      creator={template.user}
      dialogTitle={template.title}
      dialogDescription="Campaign message template"
      dialogActions={
        <Button asChild size="sm" className="gap-2">
          <Link
            href={`/app/${params.teamSlug}/message-templates/${template.id}`}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
        </Button>
      }
      dialogContent={
        <div className="prose prose-sm max-w-none">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              <div className="bg-card border rounded-lg p-6 leading-relaxed shadow-sm whitespace-pre-wrap">
                {formatTemplateContent(template.content)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      }
    />
  );
};
