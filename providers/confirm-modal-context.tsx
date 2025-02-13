"use client";

import { createContext, useContext } from "react";

interface ConfirmModalOptions {
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
}

interface ConfirmModalContextType {
  confirmModal: (options: ConfirmModalOptions) => Promise<boolean>;
}

export const ConfirmModalContext = createContext<
  ConfirmModalContextType | undefined
>(undefined);

export function useConfirmModal() {
  const context = useContext(ConfirmModalContext);
  if (!context) {
    throw new Error(
      "useConfirmModal must be used within a ConfirmModalContext.Provider"
    );
  }
  return context;
}
