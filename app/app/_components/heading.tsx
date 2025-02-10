"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useConfirmModal } from "@/providers/confirm-modal-context";

interface HeadingProps {
  title: string;
  description: string;
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
    <>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {redirect && (
          <Button
            className="bg-foreground text-background hover:bg-muted-foreground"
            asChild
          >
            <Link href={redirect.href}>
              <redirect.icon className="mr-2 h-4 w-4" />
              {redirect.label}
            </Link>
          </Button>
        )}

        {deleteButton && (
          <>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {deleteButton.label}
            </Button>
          </>
        )}
      </div>
      <Separator />
    </>
  );
}
