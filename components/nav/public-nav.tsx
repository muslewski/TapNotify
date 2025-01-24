"use client";

import MyAccount from "@/components/nav/my-account";
import { ThemeSwitcher } from "@/components/nav/theme-switcher";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import { MountainIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function PublicNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <Navbar
      maxWidth="2xl"
      classNames={{
        wrapper: "h-20",
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "after:content-['']",
          "after:absolute",
          "after:bottom-0",
          "after:left-1/2",
          "after:h-[2px]",
          "after:w-0",
          "after:rounded-[2px]",
          "after:bg-primary/20",
          "after:transition-all",
          "after:duration-300",
          "data-[active=true]:after:bg-primary",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:w-full",
        ],
      }}
      isBordered
    >
      <NavbarContent justify="start" className="flex gap-8 max-w-64">
        <NavbarBrand as={Link} href="/" className="gap-2 flex items-center">
          <MountainIcon className="size-5 text-foreground" />
          <p className="font-bold text-foreground">Mercurify</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center">
        {navItems.map((item) => (
          <NavbarItem
            key={item.label}
            isActive={pathname === item.href}
            className="transition-colors"
          >
            <Button as={Link} href={item.href} variant="light">
              {item.label}
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="flex gap-10">
        <ThemeSwitcher />
        <MyAccount />
      </NavbarContent>
    </Navbar>
  );
}
