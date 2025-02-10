"use client";

import { formatTemplateContent } from "@/components/format-template-content";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import icons from lucide-react

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
    <div className="border rounded-lg p-3 hover:bg-slate-50 transition-colors duration-200 max-w-2xl">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer group"
      >
        <div className="flex justify-between items-center mb-2">
          <div className="font-medium text-sm">{title}</div>
          <button
            className="p-1 rounded-full hover:bg-slate-200 transition-colors duration-200"
            aria-label={isExpanded ? "Collapse content" : "Expand content"}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-slate-600" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-600" />
            )}
          </button>
        </div>
        <div
          className={`text-sm text-muted-foreground ${
            !isExpanded ? "line-clamp-1" : ""
          }`}
        >
          {formatTemplateContent(content)}
        </div>
        {!isExpanded && content.length > 100 && (
          <div className="flex items-center gap-1 text-xs text-primary-600 mt-2 group-hover:underline">
            <span>Show more</span>
          </div>
        )}
        {isExpanded && (
          <div className="flex items-center gap-1 text-xs text-primary-600 mt-2 group-hover:underline">
            <span>Show less</span>
          </div>
        )}
      </div>
    </div>
  );
};
