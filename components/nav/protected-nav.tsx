"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  MenuIcon,
  ClapperboardIcon,
  CreditCardIcon,
  HouseIcon,
  LayersIcon,
  WaypointsIcon,
} from "lucide-react";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MyAccount from "@/components/nav/my-account";
import { ThemeSwitcher } from "@/components/nav/theme-switcher";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ProtectedNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: HouseIcon },
    { href: "/library", label: "Library", icon: LayersIcon },
    { href: "/marketing", label: "Marketing", icon: WaypointsIcon },
    { href: "/user", label: "Billing", icon: CreditCardIcon },
  ];

  const navVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="top-0 left-0 h-full border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="flex flex-col items-stretch h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <motion.button
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ClapperboardIcon className="size-5 text-foreground" />
            <span className="font-bold text-foreground">DopeClips</span>
          </motion.button>

          {/* Mobile */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <ClapperboardIcon className="size-5" />
                  DopeClips
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col space-y-4 mt-4">
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    asChild
                    variant="ghost"
                    className={cn(
                      "justify-start",
                      pathname === item.href && "bg-secondary"
                    )}
                  >
                    <Link href={item.href}>
                      {item.icon && <item.icon className="mr-2 h-5 w-5" />}
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop */}
        <TooltipProvider>
          <motion.div
            className="hidden md:flex flex-col flex-1 p-4 space-y-4"
            variants={navVariants}
          >
            <AnimatePresence mode="wait">
              {navItems.map((item) => (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex items-center px-4 py-2 rounded-md transition-colors",
                        pathname.startsWith(item.href)
                          ? " text-primary"
                          : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                      )}
                    >
                      {item.icon && <item.icon className="mr-2 size-4" />}
                      <span className="text-sm">{item.label}</span>
                      {pathname.startsWith(item.href) && (
                        <motion.div
                          className="absolute left-0 top-0 w-1 h-full bg-primary rounded-full"
                          layoutId="activeIndicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </Link>
                  </TooltipTrigger>

                  <TooltipContent side="right">
                    <p className="text-xs">{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </AnimatePresence>
          </motion.div>
        </TooltipProvider>

        <motion.div
          className="flex items-center justify-evenly p-4 border-t gap-4"
          variants={itemVariants}
        >
          <MyAccount alignContent="start" />
          <ThemeSwitcher alignContent="start" />
        </motion.div>
      </div>
    </motion.nav>
  );
}
