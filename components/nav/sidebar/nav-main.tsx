"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import CustomSidebarGroupLabel from "@/components/nav/sidebar/sidebar-group-label";
import { navMainProps } from "@/data/sidebar-data";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function NavMain({ navMain: items }: navMainProps) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>(() =>
    items.reduce((acc, item) => ({ ...acc, [item.title]: item.isActive }), {})
  );

  const toggleAll = () => {
    const areAllOpen = Object.values(openItems).every((isOpen) => isOpen);
    const newState = !areAllOpen;
    const updatedOpenItems = items.reduce(
      (acc, item) => ({ ...acc, [item.title]: newState }),
      {}
    );
    setOpenItems(updatedOpenItems);
  };

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between mb-2">
        <CustomSidebarGroupLabel>Menu</CustomSidebarGroupLabel>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleAll}
          className="h-8 px-2 text-gray-600 dark:text-gray-400"
        >
          <span className="text-xs">
            {Object.values(openItems).every((isOpen) => isOpen)
              ? "Collapse All"
              : "Expand All"}
          </span>
        </Button>
      </div>
      <SidebarMenu className="space-y-1">
        {items.map((item) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Collapsible
              asChild
              open={openItems[item.title]}
              className="group/collapsible"
              onOpenChange={(isOpen) =>
                setOpenItems((prev) => ({ ...prev, [item.title]: isOpen }))
              }
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="w-full px-4 py-2 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                  >
                    {item.icon && (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="text-gray-500 dark:text-gray-400"
                      >
                        <item.icon className="w-4 h-4" />
                      </motion.div>
                    )}
                    <span className="font-medium">{item.title}</span>
                    <motion.div
                      className="ml-auto"
                      animate={{
                        rotate: openItems[item.title] ? 90 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                    </motion.div>
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <SidebarMenuSub className="ml-6 mt-1 space-y-1">
                      {item.items?.map(
                        (subItem) =>
                          !subItem.hidden && (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link
                                  href={subItem.url}
                                  className={cn(
                                    "block px-4 py-2 text-sm rounded-md transition-all duration-200",
                                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                                    "text-gray-600 dark:text-gray-400 font-normal",
                                    subItem.url === pathname &&
                                      "bg-gray-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
                                    subItem.underDevelopment &&
                                      "opacity-30 hover:opacity-90 after:content-['(WIP)'] after:ml-2 after:text-xs after:font-normal"
                                  )}
                                >
                                  <motion.span
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {subItem.title}
                                  </motion.span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                      )}
                    </SidebarMenuSub>
                  </motion.div>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </motion.div>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
