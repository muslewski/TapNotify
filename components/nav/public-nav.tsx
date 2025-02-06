"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeSwitcher } from "@/components/nav/theme-switcher";
import { NavUser } from "@/components/nav/sidebar/nav-user";
import { SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";

export default function PublicNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="border-b fixed z-10 w-full backdrop-blur-md">
      <div className="flex items-center gap-12 justify-between px-4 py-3 md:px-12 md:py-4">
        <div className="flex items-center">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            {/* Mobile */}
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle>Menu</SheetTitle>
              <div className="flex flex-col space-y-4 mt-4">
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    asChild
                    variant="ghost"
                    className={cn(
                      "justify-start",
                      pathname === item.href && "font-bold"
                    )}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
                <div className="mt-auto pb-6">
                  <ThemeSwitcher showLabel alignContent="start" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/tapnotify-logo.png"
              alt="TapNotify Logo"
              width={24}
              height={24}
            />
            <span className="font-bold">TapNotify</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Button
              key={item.label}
              asChild
              variant="ghost"
              className={cn(
                "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-background after:transition-all after:duration-500",
                pathname === item.href && "after:bg-primary after:w-full"
              )}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <SidebarProvider className="min-h-fit">
            <NavUser />
          </SidebarProvider>
          <div className="hidden md:block">
            <ThemeSwitcher alignContent="end" />
          </div>
        </div>
      </div>
    </nav>
  );
}
