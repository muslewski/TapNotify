"use client";

import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { useRouter } from "next/navigation";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        themes={["dark", "light", "ceres", "umbriel", "neptune", "callisto"]}
      >
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
