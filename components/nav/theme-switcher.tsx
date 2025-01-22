"use client";

import { useTheme } from "next-themes";
import { Selection } from "@react-types/shared";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import Image from "next/image";

const themeOptions = [
  {
    key: "dark",
    label: "Mercury",
    description: "Dark theme for low-light environments",
    icon: "/planets/mercury.svg",
  },
  {
    key: "light",
    label: "Saturn",
    description: "Light theme for bright environments",
    icon: "/planets/mercury.svg",
  },
  {
    key: "ceres",
    label: "Ceres",
    description: "Balanced dwarf planet theme",
    icon: "/planets/mercury.svg",
  },
  {
    key: "umbriel",
    label: "Umbriel",
    description: "Uranian moon inspired theme",
    icon: "/planets/mercury.svg",
  },
  {
    key: "neptune",
    label: "Neptune",
    description: "Deep blue ocean theme",
    icon: "/planets/mercury.svg",
  },
  {
    key: "callisto",
    label: "Callisto",
    description: "Jovian moon inspired theme",
    icon: "/planets/mercury.svg",
  },
];

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set([theme ?? "dark"])
  );
  const channelRef = useRef<BroadcastChannel | null>(null); // used for syncing themes across tabs

  // Function to update the theme
  const updateTheme = useCallback(
    (newTheme: string) => {
      setTheme(newTheme); // Update the theme in the app.
      setSelectedKeys(new Set([newTheme])); // Update the selectedKeys state.
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
        setSelectedKeys(new Set([event.data.theme])); // Update the selected theme in the state.
      }
    };

    channelRef.current.addEventListener("message", handleMessage); // Add the message event listener.

    return () => {
      channelRef.current?.removeEventListener("message", handleMessage); // Clean up the listener.
      channelRef.current?.close(); // Close the BroadcastChannel on cleanup.
    };
  }, [setTheme]);

  // Memoized value for the selected theme option.
  const selectedTheme = useMemo(() => {
    const key = Array.from(selectedKeys)[0];
    Array.from(selectedKeys).join(", ").replace(/_/g, "");
    return themeOptions.find((option) => option.key === key) ?? themeOptions[0];
  }, [selectedKeys]);

  useEffect(() => {
    if (selectedTheme) {
      setTheme(selectedTheme.key);
    }
  }, [selectedTheme, setTheme]);

  if (!mounted) return null;

  return (
    <Dropdown>
      {/* Button that triggers the dropdown */}
      <DropdownTrigger>
        <Button
          className="capitalize"
          variant="bordered"
          color="primary"
          startContent={
            <Image
              src={selectedTheme.icon}
              alt={selectedTheme.label}
              width={20}
              height={20}
            />
          }
        >
          {selectedTheme.label}
        </Button>
      </DropdownTrigger>

      {/* Dropdown menu for theme options */}
      <DropdownMenu
        aria-label="Theme selection"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={(keys) => {
          const newTheme = Array.from(keys)[0] as string; // Get the new theme from the selection.
          updateTheme(newTheme); // Update the theme.
        }}
      >
        {themeOptions.map((option) => (
          <DropdownItem
            key={option.key}
            description={option.description}
            startContent={
              <Image
                src={option.icon}
                alt={option.label}
                width={24}
                height={24}
              />
            }
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
