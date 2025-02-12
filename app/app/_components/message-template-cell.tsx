"use client";

import { formatTemplateContent } from "@/components/format-template-content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Calendar,
  Pencil,
  AlertCircle,
  User,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageTemplate, User as PrismaUser } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { format, formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface MessageTemplateCellProps {
  template: (MessageTemplate & { user: PrismaUser }) | null;
}

export const MessageTemplateCell = ({ template }: MessageTemplateCellProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const params = useParams();

  // If no template, show placeholder card
  if (!template) {
    return (
      <Card className="p-4 bg-muted/20 border-dashed max-w-sm group hover:bg-muted/30 transition-all duration-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-muted/30 group-hover:bg-muted/50 transition-colors">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground font-medium">
              No message template selected
            </p>
          </div>
        </div>
      </Card>
    );
  }

  // Create a plain text version for preview
  const createPlainTextPreview = (content: string) => {
    return content.replace(/\{\{(.+?)\}\}/g, "$1");
  };

  const plainTextContent = createPlainTextPreview(template.content);
  const previewContent =
    plainTextContent.length > 60
      ? `${plainTextContent.slice(0, 60)}...`
      : plainTextContent;

  const createdAt = new Date(template.createdAt);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className="cursor-pointer overflow-hidden group max-w-sm">
          <div
            onClick={() => setIsDialogOpen(true)}
            className="p-4 hover:bg-accent/50 transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium mb-1 truncate group-hover:text-primary transition-colors">
                  {template.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {previewContent}
                </p>
              </div>
              <Badge variant="secondary" className="shrink-0">
                Preview
              </Badge>
            </div>
          </div>
        </Card>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl sm:max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="pb-4 border-b relative">
            {" "}
            {/* Added relative positioning */}
            <div className="flex items-start justify-between gap-4 pr-6">
              {" "}
              {/* Added right padding */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-xl">
                    {template.title}
                  </DialogTitle>
                  <DialogDescription className="mt-1.5">
                    Campaign message template
                  </DialogDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {" "}
                {/* Wrapped button in div for better spacing */}
                <Button asChild size="sm" className="gap-2">
                  <Link
                    href={`/app/${params.teamSlug}/message-templates/${template.id}`}
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Link>
                </Button>
              </div>
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 px-1">
            <div className="py-4 space-y-6">
              {/* Template metadata */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span title={format(createdAt, "PPpp")}>
                    Created{" "}
                    {formatDistanceToNow(createdAt, { addSuffix: true })}
                  </span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{template.user.name}</span>
                </div>
              </div>

              {/* Template content */}
              <div className="prose prose-sm max-w-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    <div className="bg-card border rounded-lg p-6 leading-relaxed shadow-sm">
                      {formatTemplateContent(template.content)}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </ScrollArea>

          <div className="pt-4 border-t mt-6">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="w-full"
            >
              Close Preview
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
