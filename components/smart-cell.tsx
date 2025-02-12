"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { Calendar, User } from "lucide-react";

interface SmartCellProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  preview: string | ReactNode;
  badge?: {
    label: string;
    variant?: BadgeProps["variant"];
  };
  disabled?: boolean;
  createdAt?: Date;
  creator?: {
    name: string | null;
  };
  dialogContent?: ReactNode;
  dialogTitle?: string;
  dialogDescription?: string;
  dialogActions?: ReactNode;
  onClick?: () => void;
  onOpenChange?: (open: boolean) => void;
}

export const SmartCell = ({
  icon: Icon,
  title,
  preview,
  badge,
  disabled = false,
  createdAt,
  creator,
  dialogContent,
  dialogTitle,
  dialogDescription,
  dialogActions,
  onClick,
  onOpenChange,
}: SmartCellProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    if (onClick) {
      onClick();
      return;
    }
    if (dialogContent) {
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card
          className={cn(
            "overflow-hidden group/smartCell max-w-sm",
            (onClick || dialogContent) && "cursor-pointer",
            disabled && "opacity-90"
          )}
          onClick={handleClick}
        >
          <div
            className={cn(
              "p-4 transition-all duration-200",
              !disabled && "hover:bg-accent/50",
              disabled && "bg-muted"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "p-2 rounded-full transition-colors shrink-0",
                  disabled
                    ? "bg-warning/20"
                    : "bg-primary/10 group-hover/smartCell:bg-primary/20"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    disabled ? "text-warning" : "text-primary"
                  )}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className={cn(
                    "text-sm font-medium mb-1 truncate transition-colors",
                    !disabled && "group-hover/smartCell:text-primary",
                    disabled && "text-muted-foreground"
                  )}
                >
                  {title}
                </h4>
                <div className="text-sm text-muted-foreground line-clamp-1">
                  {preview}
                </div>
              </div>
              {badge && (
                <Badge
                  variant={
                    disabled ? "destructive" : badge.variant ?? "secondary"
                  }
                  className="shrink-0"
                >
                  {badge.label}
                </Badge>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {dialogContent && (
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            onOpenChange?.(open);
          }}
        >
          <DialogContent
            className="max-w-2xl sm:max-h-[90vh] overflow-hidden flex flex-col"
            onOpenAutoFocus={(e) => {
              e.preventDefault(); // Prevent auto-focus to avoid tooltip auto-opening
            }}
          >
            <DialogHeader className="pb-4 border-b relative">
              <div className="flex items-start justify-between gap-4 pr-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">
                      {dialogTitle || title}
                    </DialogTitle>
                    {dialogDescription && (
                      <DialogDescription className="mt-1.5">
                        {dialogDescription}
                      </DialogDescription>
                    )}
                  </div>
                </div>
                {dialogActions && (
                  <div className="flex items-center gap-2">{dialogActions}</div>
                )}
              </div>
            </DialogHeader>

            <ScrollArea className="flex-1 px-1">
              <div className="py-4 space-y-6">
                {(createdAt || creator) && (
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    {createdAt && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span title={format(createdAt, "PPpp")}>
                          Created{" "}
                          {formatDistanceToNow(createdAt, { addSuffix: true })}
                        </span>
                      </div>
                    )}
                    {createdAt && creator && (
                      <Separator orientation="vertical" className="h-4" />
                    )}
                    {creator && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{creator.name}</span>
                      </div>
                    )}
                  </div>
                )}
                {dialogContent}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
