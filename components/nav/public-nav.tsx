"use client";

import MyAccount from "@/components/nav/my-account";
import { ThemeSwitcher } from "@/components/nav/theme-switcher";
import { cn } from "@/lib/utils";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { MountainIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function PublicNav() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <Navbar
      maxWidth="full"
      classNames={{
        wrapper: "gap-16 px-12",
        content: "flex gap-8 max-w-fit",
        brand: "gap-2 flex items-center",
        menu: "overflow-y-hidden gap-12",
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
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand as={Link} href="/">
          <MountainIcon className="size-5 text-foreground" />
          <p className="font-bold text-foreground">Mercurify</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="start" className="hidden md:flex gap-6">
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

      <NavbarContent justify="end">
        <MyAccount />
        <div className="hidden md:flex">
          <ThemeSwitcher />
        </div>
      </NavbarContent>

      {/* Mobile */}
      <NavbarMenu>
        {navItems.map((item) => (
          <NavbarMenuItem key={item.label} isActive={pathname === item.href}>
            <Button
              as={Link}
              href={item.href}
              variant="light"
              className={cn(
                "transition-colors",
                pathname === item.href && "border-b-2 border-primary"
              )}
            >
              {item.label}
            </Button>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="mt-auto pb-6">
          <ThemeSwitcher showLabel />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
