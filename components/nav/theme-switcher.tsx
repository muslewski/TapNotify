"use client";

import { useTheme } from "next-themes";
import { Selection } from "@react-types/shared";
import { useEffect, useMemo, useState } from "react";
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

  const selectedTheme = useMemo(() => {
    const key = Array.from(selectedKeys)[0];
    Array.from(selectedKeys).join(", ").replace(/_/g, "");
    return themeOptions.find((option) => option.key === key) ?? themeOptions[0];
  }, [selectedKeys]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedTheme) {
      setTheme(selectedTheme.key);
    }
  }, [selectedTheme, setTheme]);

  if (!mounted) return null;

  return (
    <Dropdown>
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
      <DropdownMenu
        disallowEmptySelection
        aria-label="Theme selection"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={setSelectedKeys}
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
