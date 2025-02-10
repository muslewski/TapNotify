"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageTemplate } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { formatTemplateContent } from "@/components/format-template-content";
import { CustomFieldProps } from "@/types/entity-form";

export function TemplateSelectField({
  field,
  disabled,
  customProps,
}: CustomFieldProps) {
  const { teamSlug } = useParams();
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] =
    useState<MessageTemplate | null>(
      customProps?.initialSelectedTemplate || null
    );

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(
          `/api/teams/${teamSlug}/message-templates`
        );
        if (!response.ok) throw new Error("Failed to fetch templates");
        const data = await response.json();
        setTemplates(data);
        if (field.value) {
          const selected = data.find(
            (t: MessageTemplate) => t.id === field.value
          );
          setSelectedTemplate(selected || null);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (teamSlug) {
      fetchTemplates();
    }
  }, [teamSlug, field.value]);

  const truncateContent = (content: string, maxLength: number = 100) => {
    return content.length > maxLength
      ? `${content.substring(0, maxLength)}...`
      : content;
  };

  const handleValueChange = (value: string) => {
    const selected = templates.find((t) => t.id === value);
    setSelectedTemplate(selected || null);
    field.onChange(value);
  };

  return (
    <div className="relative w-full">
      <Select
        disabled={disabled || isLoading}
        onValueChange={handleValueChange}
        defaultValue={field.value}
      >
        <SelectTrigger className="w-full min-h-fit bg-background border-2 py-2 hover:bg-accent/10 transition-all duration-200 ease-in-out">
          <div className="flex items-start text-start gap-2 w-full font-medium">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <div className="flex flex-col items-start w-full">
                {selectedTemplate ? (
                  <>
                    <span className="text-sm font-medium pb-2">
                      {selectedTemplate.title}
                    </span>
                    <div className="text-xs text-muted-foreground font-normal">
                      {formatTemplateContent(selectedTemplate.content)}
                    </div>
                  </>
                ) : (
                  <SelectValue
                    placeholder="Select a template"
                    className="text-base text-muted-foreground"
                  />
                )}
              </div>
            )}
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {templates.length === 0 && !isLoading ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No templates available
            </div>
          ) : (
            templates.map((template) => (
              <SelectItem
                key={template.id}
                value={template.id}
                className="flex flex-col items-start py-3 hover:bg-accent/10 focus:bg-accent/10 cursor-pointer transition-colors duration-200"
              >
                <div className="flex flex-col gap-1 w-full">
                  <span className="font-medium text-sm">{template.title}</span>
                  {template.content && (
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {formatTemplateContent(truncateContent(template.content))}
                    </div>
                  )}
                </div>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
