"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash2, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {redirect && (
          <Button className="bg-foreground hover:bg-muted-foreground" asChild>
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
              onClick={() => {
                if (deleteButton.confirmModal) {
                  setOpen(true);
                } else {
                  deleteButton.onClick();
                }
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {deleteButton.label}
            </Button>

            {deleteButton.confirmModal && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {deleteButton.confirmModal.heading}
                    </DialogTitle>
                    <DialogDescription>
                      {deleteButton.confirmModal.description}
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => {
                        deleteButton.onClick();
                        setOpen(false);
                      }}
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </>
        )}
      </div>
      <Separator />
    </>
  );
}
