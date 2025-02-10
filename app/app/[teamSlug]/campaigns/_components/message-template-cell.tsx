"use client";

import { formatTemplateContent } from "@/components/format-template-content";
import { useState } from "react";

interface MessageTemplateCellProps {
  title: string;
  content: string;
}

export const MessageTemplateCell = ({
  title,
  content,
}: MessageTemplateCellProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="cursor-pointer group max-w-2xl"
    >
      <div className="font-medium text-sm mb-1">{title}</div>
      <div
        className={`text-sm text-muted-foreground ${
          !isExpanded ? "line-clamp-1" : ""
        }`}
      >
        {formatTemplateContent(content)}
      </div>
      {!isExpanded && content.length > 100 && (
        <div className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Click to expand
        </div>
      )}
      {isExpanded && (
        <div className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Click to collapse
        </div>
      )}
    </div>
  );
};
