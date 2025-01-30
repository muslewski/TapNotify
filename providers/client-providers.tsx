"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

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
      {children}
      <Toaster richColors closeButton />
    </NextThemesProvider>
  );
}
