"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { MoonIcon, SunIcon, MonitorCogIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeSwitcherProps {
  showLabel?: boolean;
  alignContent?: "start" | "end" | "center";
}

const themeOptions = [
  {
    key: "dark",
    label: "Dark",
    description: "For low-light environments",
    icon: MoonIcon,
  },
  {
    key: "light",
    label: "Light",
    description: "For bright environments",
    icon: SunIcon,
  },
  {
    key: "system",
    label: "System",
    description: "Follow the system theme",
    icon: MonitorCogIcon,
  },
];

export function ThemeSwitcher({ showLabel, alignContent }: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme ?? "dark");
  const channelRef = useRef<BroadcastChannel | null>(null); // used for syncing themes across tabs

  // Function to update the theme
  const updateTheme = useCallback(
    (newTheme: string) => {
      setTheme(newTheme); // Update the theme in the app.
      setSelectedTheme(newTheme);
      channelRef.current?.postMessage({
        type: "THEME_CHANGE",
        theme: newTheme,
      }); // Notify other tabs of the theme change.
    },
    [setTheme]
  );

  // Effect to set up the BroadcastChannel and handle theme synchronization.
  useEffect(() => {
    setMounted(true); // Set `mounted` to true after the component has mounted.
    channelRef.current = new BroadcastChannel("theme_sync"); // Create a BroadcastChannel named "theme_sync".

    // Listener for theme change messages from other tabs.
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "THEME_CHANGE") {
        setTheme(event.data.theme); // Update the theme.
        setSelectedTheme(event.data.theme); // Update the selected theme in the state.
      }
    };

    channelRef.current.addEventListener("message", handleMessage); // Add the message event listener.

    return () => {
      channelRef.current?.removeEventListener("message", handleMessage); // Clean up the listener.
      channelRef.current?.close(); // Close the BroadcastChannel on cleanup.
    };
  }, [setTheme]);

  // Memoized value for the selected theme option.
  const currentTheme = useMemo(
    () =>
      themeOptions.find((option) => option.key === selectedTheme) ??
      themeOptions[0],
    [selectedTheme]
  );

  useEffect(() => {
    if (currentTheme) {
      setTheme(currentTheme.key);
    }
  }, [currentTheme, setTheme]);

  const ThemeIcon = currentTheme.icon;

  if (!mounted) return <Skeleton className="w-[49px] h-10 rounded-md" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="default"
          className="flex items-center justify-center"
        >
          <ThemeIcon className="h-6 w-6" />
          {showLabel && <span className="ml-2">{currentTheme.label}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-1" align={alignContent}>
        {themeOptions.map((option) => {
          const OptionIcon = option.icon;
          return (
            <DropdownMenuItem
              key={option.key}
              onClick={() => updateTheme(option.key)}
              className={cn(option.key === selectedTheme && "text-primary-400")}
            >
              <div className="flex items-center gap-4">
                <OptionIcon size={24} />
                <div>
                  <div>{option.label}</div>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
