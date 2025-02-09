"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { ConfirmModalProvider } from "@/providers/confirm-modal-provider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      enableSystem
      defaultTheme="system"
      themes={["dark", "light", "system"]}
    >
      <ConfirmModalProvider>
        {children}
        <Toaster richColors closeButton />
      </ConfirmModalProvider>
    </NextThemesProvider>
  );
}
