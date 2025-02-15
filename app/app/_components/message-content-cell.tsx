"use client";

import { MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SmartCell } from "@/components/smart-cell";
import { formatTemplateContent } from "@/components/format-template-content";

interface MessageContentCellProps {
  content: string;
  title?: string;
}

export const MessageContentCell = ({
  content,
  title = "Message",
}: MessageContentCellProps) => {
  const createPlainTextPreview = (text: string) => {
    return text.replace(/\{\{(.+?)\}\}/g, "$1");
  };

  const plainTextContent = createPlainTextPreview(content);
  const previewContent =
    plainTextContent.length > 60
      ? `${plainTextContent.slice(0, 60)}...`
      : plainTextContent;

  return (
    <SmartCell
      icon={MessageSquare}
      title={title}
      preview={previewContent}
      badge={{
        label: "Preview",
        variant: "secondary",
      }}
      dialogTitle={title}
      dialogDescription="Preview content"
      dialogContent={
        <div className="prose prose-sm max-w-none">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              <div className="bg-card border rounded-lg p-6 leading-relaxed shadow-sm whitespace-pre-wrap">
                {formatTemplateContent(content)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      }
    />
  );
};
