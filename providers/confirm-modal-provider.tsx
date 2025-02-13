"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ConfirmModalContext } from "./confirm-modal-context";

let confirmModalResolver: ((value: boolean) => void) | null = null;

export function ConfirmModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<{
    heading: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmVariant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
  } | null>(null);

  const confirmModal = useCallback(
    (options: {
      heading: string;
      description: string;
      confirmLabel?: string;
      cancelLabel?: string;
      confirmVariant?:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link";
    }) => {
      setOptions(options);
      setOpen(true);
      return new Promise<boolean>((resolve) => {
        confirmModalResolver = resolve;
      });
    },
    []
  );

  const handleClose = useCallback(() => {
    setOpen(false);
    confirmModalResolver?.(false);
    confirmModalResolver = null;
  }, []);

  const handleConfirm = useCallback(() => {
    setOpen(false);
    confirmModalResolver?.(true);
    confirmModalResolver = null;
  }, []);

  return (
    <>
      <ConfirmModalContext.Provider value={{ confirmModal }}>
        {children}
        {options && (
          <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{options.heading}</DialogTitle>
                <DialogDescription>{options.description}</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={handleClose}>
                  {options.cancelLabel || "Cancel"}
                </Button>
                <Button
                  variant={options.confirmVariant}
                  onClick={handleConfirm}
                >
                  {options.confirmLabel || "Confirm"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </ConfirmModalContext.Provider>
    </>
  );
}
