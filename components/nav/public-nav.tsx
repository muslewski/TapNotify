"use client";

import MyAccount from "@/components/nav/my-account";
import { ThemeSwitcher } from "@/components/nav/theme-switcher";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";

export default function PublicNav() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <p className="font-bold text-inherit">Mercurify</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/features">Features</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/pricing">Pricing</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/contact">Contact</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <ThemeSwitcher />
        <MyAccount />
      </NavbarContent>
    </Navbar>
  );
}
