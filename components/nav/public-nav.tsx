"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MountainIcon, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MyAccount from "@/components/nav/my-account";
import { ThemeSwitcher } from "@/components/nav/theme-switcher";

export default function PublicNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="border-b">
      <div className="flex items-center justify-between px-4 py-3 md:px-12 md:py-4">
        <div className="flex items-center">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
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
                  <ThemeSwitcher showLabel />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <MountainIcon className="h-5 w-5 text-foreground" />
            <span className="font-bold text-foreground">DopeClips</span>
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

        <div className="flex items-center space-x-6">
          <MyAccount />
          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
