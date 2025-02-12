"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useConfirmModal } from "@/providers/confirm-modal-context";
import { motion } from "framer-motion";

interface HeadingProps {
  title: string;
  description: string;
  mainIcon?: LucideIcon;
  number?: number;
  redirect?: {
    label: string;
    href: string;
    icon: LucideIcon;
  };
  deleteButton?: {
    label: string;
    onClick: () => void;
    confirmModal?: {
      heading: string;
      description: string;
    };
  };
}

export default function Heading({
  title,
  description,
  mainIcon: MainIcon,
  number,
  redirect,
  deleteButton,
}: HeadingProps) {
  const { confirmModal } = useConfirmModal();

  const handleDelete = async () => {
    if (deleteButton?.confirmModal) {
      const confirmed = await confirmModal({
        heading: deleteButton.confirmModal.heading,
        description: deleteButton.confirmModal.description,
        confirmLabel: "Delete",
        confirmVariant: "destructive",
      });

      if (confirmed) {
        deleteButton.onClick();
      }
    } else {
      deleteButton?.onClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-4">
            {MainIcon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.2,
                }}
                className="p-3 rounded-md bg-muted"
              >
                <MainIcon className="w-6 h-6 text-foreground/80" />
              </motion.div>
            )}
            <div className="flex items-center gap-4">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-3xl font-bold tracking-tight text-foreground"
              >
                {title}
              </motion.h2>
              {typeof number !== "undefined" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.25,
                  }}
                  className="px-2.5 py-0.5 text-sm rounded-md bg-muted text-muted-foreground"
                >
                  {number}
                </motion.span>
              )}
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground max-w-[550px]"
          >
            {description}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 self-end"
        >
          {redirect && (
            <motion.div whileHover={{ y: -1 }} whileTap={{ y: 0 }}>
              <Button variant="secondary" size="sm" asChild className="h-9">
                <Link href={redirect.href} className="flex items-center gap-2">
                  <redirect.icon className="h-4 w-4" />
                  {redirect.label}
                </Link>
              </Button>
            </motion.div>
          )}

          {deleteButton && (
            <motion.div whileHover={{ y: -1 }} whileTap={{ y: 0 }}>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                className="h-9"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {deleteButton.label}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-full"
      >
        <Separator className="bg-gradient-to-r from-foreground/10 via-foreground/20 to-foreground/10" />
      </motion.div>
    </motion.div>
  );
}
